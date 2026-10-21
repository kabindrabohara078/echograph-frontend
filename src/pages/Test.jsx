import React, { useState } from 'react';
import Popup from '../assets/elements/Popup';
import { Navigate, Link } from 'react-router-dom';
import { API_URL } from '../config/api';
import {
    Database,
    Search,
    Plus,
    Trash2,
    Copy,
    Check,
    Sparkles,
    Clock,
    Activity,
    Filter,
    Layers,
    ArrowRight,
    HelpCircle,
    Sliders,
    Zap,
    ExternalLink,
    RotateCw,
    Infinity as InfinityIcon
} from 'lucide-react';

const CATEGORY_COLORS = {
    preference: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    fact: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    decision: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    goal: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    task: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    delete: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
};

const SAMPLE_QUERIES = [
    "What UI theme and tech stack does user prefer?",
    "What database engine does EchoGraph use?",
    "What architectural decisions were made?",
    "Tell me about autonomous agent goals"
];

const Test = (props) => {
    const isDark = props.dark;
    const [activeTab, setActiveTab] = useState('both'); // 'both' | 'ingest' | 'search'
    const [contextTypeGet, setContextTypeGet] = useState('');
    const [contextTypeSend, setContextTypeSend] = useState('preference');
    const [textInputSend, setTextInputSend] = useState('');
    const [textInputGet, setTextInputGet] = useState('');
    const [importanceScore, setImportanceScore] = useState(1.0);
    
    // Retention & Lifespan states
    const [lifespanPreset, setLifespanPreset] = useState('91d'); // 'permanent' | '2h' | '24h' | '7d' | '30d' | '91d' | 'custom'
    const [isPermanent, setIsPermanent] = useState(false);
    const [isCustomLifespan, setIsCustomLifespan] = useState(false);
    const [customValue, setCustomValue] = useState(91);
    const [customUnit, setCustomUnit] = useState('days'); // 'hours' | 'days' | 'weeks' | 'months' | 'years'
    
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [storing, setStoring] = useState(false);
    const [scanningCleanup, setScanningCleanup] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [lastQueryMeta, setLastQueryMeta] = useState(null);

    if (!props.token) {
        return <Navigate to="/auth" replace />;
    }

    const handlePresetChange = (preset) => {
        setLifespanPreset(preset);
        if (preset === 'permanent') {
            setIsPermanent(true);
            setIsCustomLifespan(false);
        } else if (preset === 'custom') {
            setIsCustomLifespan(true);
            setIsPermanent(false);
        } else {
            setIsPermanent(false);
            setIsCustomLifespan(false);
            if (preset === '2h') {
                setCustomValue(2);
                setCustomUnit('hours');
            } else if (preset === '24h') {
                setCustomValue(24);
                setCustomUnit('hours');
            } else if (preset === '7d') {
                setCustomValue(7);
                setCustomUnit('days');
            } else if (preset === '30d') {
                setCustomValue(30);
                setCustomUnit('days');
            } else if (preset === '91d') {
                setCustomValue(91);
                setCustomUnit('days');
            }
        }
    };

    const formatLifespan = (node) => {
        if (node.state === 'permanent' || node.node_life === -1) {
            return {
                text: 'Permanent ♾️',
                badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
            };
        }
        if (node.node_life === undefined || node.node_life === null) {
            return {
                text: '91d remaining',
                badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
            };
        }
        const hours = parseInt(node.node_life, 10);
        if (hours <= 0) {
            return {
                text: 'Expired',
                badgeClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
            };
        }
        if (hours < 24) {
            return {
                text: `${hours}h remaining`,
                badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            };
        }
        const days = Math.floor(hours / 24);
        const remHours = hours % 24;
        return {
            text: remHours > 0 ? `${days}d ${remHours}h remaining` : `${days}d remaining`,
            badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        };
    };

    // Ingest new memory node
    const sendData = async () => {
        if (!textInputSend.trim()) {
            if (props.setPopupText) props.setPopupText('Please enter memory context text');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            if (props.setPopupText) props.setPopupText('Please login to store memories');
            return;
        }

        setStoring(true);
        const payload = {
            context: textInputSend.trim(),
            type: contextTypeSend,
            score: parseFloat(importanceScore),
            is_permanent: isPermanent,
            lifespan_unit: isPermanent ? "permanent" : customUnit,
            lifespan_value: isPermanent ? null : (parseInt(customValue, 10) || 1),
            node_life: isPermanent ? -1 : undefined
        };

        try {
            const response = await fetch(`${API_URL}/memory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 401) {
                if (props.setPopupText) props.setPopupText("Session expired. Please login again.");
            } else if (response.ok) {
                const lifeDesc = isPermanent ? "Permanent ♾️" : `${customValue} ${customUnit}`;
                if (props.setPopupText) props.setPopupText(`Memory node stored successfully! (Lifespan: ${lifeDesc})`);
                setTextInputSend('');
                // If there is an active search, re-run query to show new node
                if (textInputGet.trim()) {
                    getData();
                }
            } else {
                if (props.setPopupText) props.setPopupText(data.detail || "An error occurred during ingestion");
            }
        } catch (err) {
            console.error("Ingest Error:", err);
            if (props.setPopupText) props.setPopupText("Failed to communicate with API server");
        } finally {
            setStoring(false);
        }
    };

    // Trigger on-demand hourly lifespan scan
    const triggerHourlyScan = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            if (props.setPopupText) props.setPopupText('Please login to run lifespan scan');
            return;
        }

        setScanningCleanup(true);
        try {
            const response = await fetch(`${API_URL}/memory/cleanup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                if (props.setPopupText) {
                    props.setPopupText("1h Lifespan Scan executed: Active lifespans reduced by 1h, expired records purged.");
                }
                if (textInputGet.trim()) {
                    getData();
                }
            } else {
                if (props.setPopupText) props.setPopupText(data.detail || "Lifespan scan failed");
            }
        } catch (err) {
            console.error("Cleanup scan error:", err);
            if (props.setPopupText) props.setPopupText("Failed to communicate with cleanup service");
        } finally {
            setScanningCleanup(false);
        }
    };

    // Semantic Vector Search
    const getData = async (overrideQuery = null) => {
        const queryText = overrideQuery !== null ? overrideQuery : textInputGet;
        if (!queryText || !queryText.trim()) {
            if (props.setPopupText) props.setPopupText('Please enter a semantic search query');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            if (props.setPopupText) props.setPopupText('Please login to query memories');
            return;
        }

        setSearching(true);
        const startTime = performance.now();
        const payload = {
            query: queryText.trim(),
            type: contextTypeGet && contextTypeGet !== 'all' ? contextTypeGet : undefined
        };

        try {
            const response = await fetch(`${API_URL}/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            const elapsed = Math.round(performance.now() - startTime);

            if (response.ok) {
                setSearchResults(data.results || []);
                setLastQueryMeta({
                    count: data.count || (data.results ? data.results.length : 0),
                    latency: elapsed,
                    query: queryText.trim()
                });
                if (props.setPopupText) {
                    props.setPopupText(`Found ${data.count || 0} relevant memory nodes in ${elapsed}ms`);
                }
            } else {
                if (props.setPopupText) props.setPopupText(data.detail || "Search query failed");
            }
        } catch (err) {
            console.error("Search Error:", err);
            if (props.setPopupText) props.setPopupText("Failed to retrieve query context");
        } finally {
            setSearching(false);
        }
    };

    // Delete Memory Node
    const handleDeleteMemory = async (content, refId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setDeletingId(refId);
        try {
            const response = await fetch(`${API_URL}/memory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    context: content,
                    type: "delete",
                    score: 1.0,
                    node_life: 91
                })
            });

            const data = await response.json();
            if (response.ok) {
                setSearchResults(prev => prev.filter(r => r.id !== refId));
                if (props.setPopupText) props.setPopupText("Memory node removed from vector index");
            } else {
                if (props.setPopupText) props.setPopupText(data.detail || "Delete failed");
            }
        } catch (err) {
            console.error("Delete Error:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1800);
    };

    const contextOptions = [
        "preference",
        "fact",
        "decision",
        "goal",
        "task",
        "knowledge",
        "observation",
        "conversation"
    ];

    return (
        <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Popup text={props.popupText} clearPop={props.clearPop} />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Strip with Engine Status */}
                <br />
            <br />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 pt-4 border-[var(--border-color)]">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            Memory Engine <span className="text-blue-500">Playground</span>
                        </h1>
                        <p className="text-sm mt-1 text-[var(--text-secondary)]">
                            Live ingestion sandbox, pgvector cosine distance ranking, and semantic retrieval tester.
                        </p>
                    </div>
                </div>

                {/* Workspace Grid */}
                <div className={`grid gap-8 items-start ${
                    activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 max-w-3xl mx-auto'
                }`}>
                    {/* LEFT: INGESTION PANEL */}
                    {(activeTab === 'both' || activeTab === 'ingest') && (
                        <div className={`app-card p-6 space-y-6 ${activeTab === 'both' ? 'lg:col-span-5' : ''}`}>
                            <div className="flex items-center justify-between border-b pb-4 border-[var(--border-color)]">
                                <div className="flex items-center gap-2">

                                    <div>
                                        <h2 className="text-[15px] font-bold">Add context manually</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Ingestion Textarea */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] flex justify-between">
                                    <span>Context Memory Statement</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={textInputSend}
                                    onChange={(e) => setTextInputSend(e.target.value)}
                                    placeholder="e.g. User prefers raw SQL queries with pgvector and dark mode developer tools over generic chat apps."
                                    className="w-full p-3.5 rounded-xl border text-sm outline-none transition-all input-custom resize-none"
                                />
                            </div>

                            {/* Category Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                                    Memory Category Tag
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {contextOptions.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setContextTypeSend(item)}
                                            className={`px-2.5 py-1 h-10 w-25 rounded-lg text-[15px] font-medium cursor-pointer transition-all border ${
                                                contextTypeSend === item
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                    : 'border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Importance & Retention Controls */}
                            <div className="space-y-4 pt-1">
                                <div>
                                    <label className="text-xs font-semibold text-[var(--text-secondary)] flex justify-between mb-1.5">
                                        <span>Importance Score</span>
                                        <span className="font-mono font-bold text-blue-400">{importanceScore}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1.0"
                                        step="0.05"
                                        value={importanceScore}
                                        onChange={(e) => setImportanceScore(e.target.value)}
                                        className="w-full accent-blue-500 cursor-pointer"
                                    />
                                </div>

                                {/* Retention & Lifespan Options */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
                                            <span>Node Lifespan & Retention</span>
                                        </label>
                                        {/* <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                                            {isPermanent ? "♾️ Permanent" : `${customValue} ${customUnit}`}
                                        </span> */}
                                    </div>

                                    {/* Preset Pills & Custom Button */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {[
                                            { id: 'permanent', label: 'Permanent', isSpecial: true },
                                            { id: '2h', label: '2 Hours' },
                                            { id: '24h', label: '24 Hours' },
                                            { id: '7d', label: '7 Days' },
                                            { id: '30d', label: '30 Days' },
                                            { id: '91d', label: '91 Days (Std)' },
                                            { id: 'custom', label: 'Custom...', isCustom: true }
                                        ].map((p) => {
                                            const isSelected = lifespanPreset === p.id;
                                            return (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onClick={() => handlePresetChange(p.id)}
                                                    className={`px-2.5 py-1.5 rounded-lg text-[15px] font-medium cursor-pointer transition-all border ${
                                                        isSelected
                                                            ? p.id === 'permanent'
                                                                ? 'bg-white text-black border-purple-600 shadow-sm'
                                                                : 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                            : p.id === 'permanent'
                                                                ? 'border-blue-500/30 bg-purple-500/10 text-blue-400 hover:border-purple-500'
                                                                : p.isCustom
                                                                    ? 'border-dashed border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:border-blue-500 hover:text-blue-400'
                                                                    : 'border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                                                    }`}
                                                >
                                                    {p.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Custom Lifespan Expanded Panel */}
                                    {isCustomLifespan && (
                                        <div className="p-3.5 rounded-xl border border-white/70 bg-black/10 space-y-3 mt-2">
                                            <div className="flex items-center justify-between text-xs font-semibold text-blue-600">
                                                <span className="flex items-center gap-1.5">
                                                    Custom Retention Period
                                                </span>
                                            </div>

                                            {!isPermanent ? (
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className="col-span-5">
                                                        <label className="text-[11px] font-medium text-[var(--text-secondary)] mb-1 block">
                                                            Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="999"
                                                            value={customValue}
                                                            onChange={(e) => setCustomValue(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                                            className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none input-custom font-mono"
                                                            placeholder="e.g. 2"
                                                        />
                                                    </div>

                                                    <div className="col-span-7">
                                                        <label className="text-[11px] font-medium text-[var(--text-secondary)] mb-1 block">
                                                            Time Unit
                                                        </label>
                                                        <select
                                                            value={customUnit}
                                                            onChange={(e) => setCustomUnit(e.target.value)}
                                                            className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none input-custom capitalize"
                                                        >
                                                            <option value="hours">Hours (Decrements every 1h)</option>
                                                            <option value="days">Days</option>
                                                            <option value="weeks">Weeks</option>
                                                            <option value="months">Months</option>
                                                            <option value="years">Years</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-2.5 rounded-lg bg-white border border-purple-500/20 text-xs text-purple-300">
                                                    ♾️ <strong>Permanent Context:</strong> This memory row will never be decremented or deleted by the hourly cleanup loop. It persists until manually removed.
                                                </div>
                                            )}

                                            <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed pt-1 border-t border-[var(--border-color)]">
                                                {!isPermanent ? (
                                                    <span>
                                                        Scheduled lifespan: <strong>{customValue} {customUnit}</strong>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        Permanent context will be stored with state <code>permanent</code> and will remain protected from all automated TTL sweeps.
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    onClick={sendData}
                                    disabled={storing}
                                    className="btn btn-primary w-full shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {storing ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                            Ingesting into Vector Bank...
                                        </>
                                    ) : (
                                        <>
                                            Add manually
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* RIGHT: SEMANTIC QUERY & RESULTS PANEL */}
                    {(activeTab === 'both' || activeTab === 'search') && (
                        <div className={`app-card p-6 space-y-6 ${activeTab === 'both' ? 'lg:col-span-7' : ''}`}>
                            <div className="flex items-center justify-between border-b pb-4 border-[var(--border-color)]">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <h2 className="text-[15px] font-bold">Search stored Contexts</h2>
                                    </div>
                                </div>

                                {/* On-demand 1h Lifespan Scan Button */}
                                <button
                                    onClick={triggerHourlyScan}
                                    disabled={scanningCleanup}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-blue-500 hover:text-blue-400 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Runs an on-demand 1-hour scan: Decrements active memory lifespans by 1 hour and automatically purges expired records (node_life <= 0)"
                                >
                                    <RotateCw className={`w-3.5 h-3.5 ${scanningCleanup ? 'animate-spin text-blue-400' : 'text-blue-400'}`} />
                                    <span>{scanningCleanup ? "Running 1h Scan..." : "Run 1h Lifespan Scan"}</span>
                                </button>
                            </div>

                            {/* Query Input Bar */}
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={textInputGet}
                                            onChange={(e) => setTextInputGet(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && getData()}
                                            placeholder="Ask a question or enter semantic query..."
                                            className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border text-sm outline-none transition-all input-custom"
                                        />
                                        {textInputGet && (
                                            <button
                                                onClick={() => setTextInputGet('')}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => getData()}
                                        disabled={searching}
                                        className="btn btn-primary px-5 cursor-pointer disabled:opacity-50 shrink-0"
                                    >
                                        {searching ? (
                                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                        ) : (
                                        <span>Fetch</span>
                                        )}
                                    </button>
                                </div>

                                
                            </div>

                            {/* Category Filter Pills */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                                <span className="text-[var(--text-muted)] text-[11px] uppercase font-semibold tracking-wider shrink-0">
                                    Filter:
                                </span>
                                <button
                                    onClick={() => setContextTypeGet('')}
                                    className={`px-2.5 py-0.5 h-10 w-25 rounded-md font-medium cursor-pointer transition-all border text-[13px] ${
                                        contextTypeGet === ''
                                            ? 'bg-[var(--accent-primary)] text-[var(--btn-text)] border-[var(--accent-primary)]'
                                            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    All Types
                                </button>
                                {['preference', 'fact', 'decision', 'goal'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setContextTypeGet(cat)}
                                        className={`px-2.5 py-0.5 h-10 w-25 rounded-md font-medium cursor-pointer transition-all border text-[15px] ${
                                            contextTypeGet === cat
                                                ? 'text-blue-800'
                                                : 'border-blue-200 text-gray hover:text-[var(--text-primary)]'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Results Meta Info */}
                            {lastQueryMeta && (
                                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono border-t pt-3 border-[var(--border-color)]">
                                    <span>Found {lastQueryMeta.count} related contexts</span>
                                </div>
                            )}

                            {/* Search Results List */}
                            <div className="space-y-3">
                                {searchResults.length > 0 ? (
                                    searchResults.map((node) => {
                                        const dist = typeof node.distance === 'number' ? node.distance : 0.5;
                                        const similarityScore = Math.max(0, Math.min(100, Math.round((1 - dist) * 100)));
                                        const rankScore = typeof node.final_rank === 'number' ? node.final_rank.toFixed(3) : '1.000';
                                        const catClass = CATEGORY_COLORS[node.type] || CATEGORY_COLORS.fact;
                                        const lifeInfo = formatLifespan(node);

                                        return (
                                            <div
                                                key={node.id}
                                                className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--border-hover)] transition-all space-y-3"
                                            >
                                                {/* Card Header */}
                                                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs font-bold">
                                                             #{node.id}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] text-white font-semibold uppercase border ${catClass}`}>
                                                            {node.type}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-xs font-mono">
                                                        <span className="text-[var(--text-secondary)]" title="Cosine distance (lower is closer)">
                                                            Dist: <strong className="text-white">{dist.toFixed(3)}</strong>
                                                        </span>
                                                        <span className="text-[var(--text-secondary)]" title="Adaptive ranking score">
                                                            Rank: <strong className="text-white">{rankScore}</strong>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content Body */}
                                                <p className="text-sm leading-relaxed text-[var(--text-primary)] font-sans">
                                                    {node.content}
                                                </p>

                                                {/* Similarity & Lifespan Bar */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
                                                        <span>Vector Match: {similarityScore}%</span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${lifeInfo.badgeClass}`}
                                                            title={node.expires_at ? `Auto-deletion at: ${new Date(node.expires_at).toLocaleString()}` : (node.state === 'permanent' ? 'Permanent node (never auto-deleted)' : undefined)}
                                                        >
                                                            {lifeInfo.text}
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-1.5 rounded-full bg-[var(--border-color)] overflow-hidden">
                                                        <div
                                                            className="h-full bg-white"
                                                            style={{ width: `${similarityScore}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Card Footer Actions */}
                                                <div className="flex items-center justify-between pt-1 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                                                    <span className="font-mono text-[10px]">
                                                        {node.created_at ? new Date(node.created_at).toLocaleDateString() : 'Active'}
                                                        {node.expires_at && (
                                                            <span className="ml-2 text-[var(--text-muted)] hidden sm:inline" title={node.expires_at}>
                                                                • Expires: {new Date(node.expires_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        )}
                                                    </span>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => copyToClipboard(node.content, node.id)}
                                                            className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                                                            title="Copy memory content"
                                                        >
                                                            {copiedId === node.id ? (
                                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteMemory(node.content, node.id)}
                                                            disabled={deletingId === node.id}
                                                            className="p-1 rounded text-rose-400 hover:text-rose-300 cursor-pointer transition-colors"
                                                            title="Delete this memory"
                                                        >
                                                            {deletingId === node.id ? (
                                                                <span className="w-3 h-3 border-2 border-rose-400 border-t-transparent rounded-full animate-spin block"></span>
                                                            ) : (
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    /* Empty State */
                                    <div className="p-8 text-center rounded-xl border border-dashed border-[var(--border-color)] space-y-3">
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-semibold text-[20px]">
                                                No Memories Retrieved Yet
                                            </h3>
                                            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                                                Execute a semantic search query above, or add new facts on the left panel to test the memory vector store.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Test;