import React, { useState } from 'react';
import { 
    Database, 
    Cpu, 
    Zap, 
    Activity, 
    Layers, 
    Check, 
    Copy, 
    Sliders, 
    Clock, 
    Sparkles, 
    ArrowRight,
    TrendingUp,
    Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Memory(props) {
    const [activeSection, setActiveSection] = useState('ranking');
    const isDark = props.dark;

    // Interactive decay simulator state
    const [simDistance, setSimDistance] = useState(0.18);
    const [simImportance, setSimImportance] = useState(0.9);
    const [simDays, setSimDays] = useState(5);
    const [simAccessCount, setSimAccessCount] = useState(3);
    const halfLifeDays = 60;

    // Calculations
    const simSimilarity = Math.max(0, 1 - simDistance);
    const simDecayFactor = Math.exp(-simDays / halfLifeDays);
    const simAccessMultiplier = 1 + Math.min(simAccessCount * 0.15, 1.0);
    const simFinalRank = (simSimilarity * simImportance * simDecayFactor * simAccessMultiplier).toFixed(3);

    const memoryTypes = [
        {
            name: "preference",
            color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
            badge: "User Persona",
            desc: "User habits, favorite programming languages, UI preferences, and personal coding guidelines.",
            example: '{"context": "Prefers raw SQL queries over heavyweight ORMs", "type": "preference", "importance": 0.9}'
        },
        {
            name: "fact",
            color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
            badge: "Verifiable Knowledge",
            desc: "Concrete system facts, API server URLs, architecture decisions, and static system configurations.",
            example: '{"context": "Backend runs on FastAPI with pgvector on port 8000", "type": "fact", "importance": 1.0}'
        },
        {
            name: "decision",
            color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
            badge: "Architectural Choice",
            desc: "Historical rationale, trade-off outcomes, and design decisions recorded for agent contextual reasoning.",
            example: '{"context": "Chose SQLite fallback for offline local developer workflows", "type": "decision", "importance": 0.85}'
        },
        {
            name: "goal",
            color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
            badge: "Agent Objective",
            desc: "Milestones, active project sprints, and autonomous target objectives.",
            example: '{"context": "Complete human-like UI overhaul matching real-sum design", "type": "goal", "importance": 0.95}'
        },
        {
            name: "event",
            color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
            badge: "Temporal Trace",
            desc: "User interactions, critical deployment events, and chronological system logs.",
            example: '{"context": "Switched environment configuration to local offline SQLite", "type": "event", "importance": 0.7}'
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <br />
            <br />
            {/* HERO HEADER */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Inside the{' '}
                    <span className="text-blue-400">
                        Cognitive Engine
                    </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                    EchoGraph is not a generic vector pass-through. It is a live cognitive layer that dynamically balances semantic similarity, exponential temporal decay, and retrieval access frequency.
                </p>
            </div>

            {/* ARCHITECTURE METRIC STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { title: "Embedding Dim", value: "384-d", label: "Sentence Transformers (all-MiniLM-L6-v2)", icon: <Cpu color='#50a2ff' className="w-5 h-5 text-blue-400" /> },
                    { title: "Storage Engine", value: "pgvector", label: "PostgreSQL Native + SQLite Offline", icon: <Database color='#50a2ff' className="w-5 h-5 text-cyan-400" /> },
                    { title: "Index Latency", value: "< 8ms", label: "Cosine Search with HNSW", icon: <Zap color='#50a2ff' className="w-5 h-5 text-emerald-400" /> },
                    { title: "Decay Curve", value: "Half-Life", label: "Exponential Temporal Function", icon: <Activity color='#50a2ff' className="w-5 h-5 text-purple-400" /> }
                ].map((m, i) => (
                    <div key={i} className="app-card p-6">
                        <div className="flex items-center justify-between mb-3">
                            {m.icon}
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">
                            {m.value}
                        </div>
                        <div className="text-xs mt-1 text-[var(--text-muted)]">
                            {m.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* INTERACTIVE COMPONENT SHOWCASE */}
            <div className="app-card p-6 sm:p-10 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                        Memory Ranking & Lifecycle Pipeline
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        Select an architectural subsystem below to explore the internal mathematical ranking pipeline.
                    </p>
                </div>

                {/* Subsystem Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] gap-1">
                        {[
                            { id: 'ranking', name: 'Adaptive Ranking Simulator'},
                            { id: 'types', name: 'Memory Categories'},
                            { id: 'lifecycle', name: 'Node Lifecycle & Decay'}
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id)}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                                    activeSection === tab.id
                                        ? 'bg-[var(--accent-primary)] text-[var(--btn-text)] shadow-sm'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                                }`}
                            >
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* TAB 1: INTERACTIVE RANKING SIMULATOR */}
                {activeSection === 'ranking' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
                        {/* Interactive Sliders Form */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                    <Sliders color='#50a2ff' className="w-5 h-5 text-blue-400" />
                                    <span>Interactive Ranking Calculator</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                    EchoGraph does not rely on raw vector cosine distance alone. We dynamically multiply semantic similarity by an exponential time decay curve and an access count multiplier.
                                </p>
                            </div>

                            {/* Mathematical formula badge */}
                            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] font-mono text-xs text-blue-400 overflow-x-auto">
                                Final Rank = (1 - Distance) × Importance × e<sup>-(Δt / HalfLife)</sup> × (1 + AccessRatio)
                            </div>

                            {/* Sliders */}
                            <div className="space-y-4 pt-2">
                                <div>
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span className="text-[var(--text-secondary)]">Cosine Distance (d):</span>
                                        <span className="text-[var(--text-primary)] font-bold">{simDistance.toFixed(2)} (Similarity: {simSimilarity.toFixed(2)})</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.01"
                                        max="0.99"
                                        step="0.01"
                                        value={simDistance}
                                        onChange={(e) => setSimDistance(parseFloat(e.target.value))}
                                        className="w-full accent-blue-500 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span className="text-[var(--text-secondary)]">User Assigned Importance:</span>
                                        <span className="text-[var(--text-primary)] font-bold">{simImportance.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1.0"
                                        step="0.05"
                                        value={simImportance}
                                        onChange={(e) => setSimImportance(parseFloat(e.target.value))}
                                        className="w-full accent-blue-500 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span className="text-[var(--text-secondary)]">Days Elapsed (Δt):</span>
                                        <span className="text-[var(--text-primary)] font-bold">{simDays} days (Decay factor: {simDecayFactor.toFixed(3)})</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="180"
                                        step="1"
                                        value={simDays}
                                        onChange={(e) => setSimDays(parseInt(e.target.value))}
                                        className="w-full accent-blue-500 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span className="text-[var(--text-secondary)]">Query Access Frequency:</span>
                                        <span className="text-[var(--text-primary)] font-bold">{simAccessCount} accesses (Multiplier: {simAccessMultiplier.toFixed(2)}x)</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        step="1"
                                        value={simAccessCount}
                                        onChange={(e) => setSimAccessCount(parseInt(e.target.value))}
                                        className="w-full accent-blue-500 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Live Calculated JSON Response Card */}
                        <div className="lg:col-span-6 space-y-4">
                            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] font-mono text-xs space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                                    <span className="text-blue-400 font-bold">// Engine Evaluation Result</span>
                                    <span className="badge-mono text-emerald-400 border-emerald-500/30">node_id #8492</span>
                                </div>

                                <div className="space-y-2 text-[var(--text-secondary)]">
                                    <div><span className="text-[var(--text-muted)]">"semantic_similarity":</span> <span className="text-emerald-400">{simSimilarity.toFixed(3)}</span></div>
                                    <div><span className="text-[var(--text-muted)]">"importance_score":</span> <span className="text-blue-400">{simImportance.toFixed(2)}</span></div>
                                    <div><span className="text-[var(--text-muted)]">"temporal_decay_factor":</span> <span className="text-amber-400">{simDecayFactor.toFixed(3)}</span></div>
                                    <div><span className="text-[var(--text-muted)]">"access_multiplier":</span> <span className="text-purple-400">{simAccessMultiplier.toFixed(2)}x</span></div>
                                    <div className="pt-2 border-t border-[var(--border-color)]">
                                        <span className="text-[var(--text-primary)] font-bold text-sm">"FINAL_RANK_SCORE": </span>
                                        <span className="text-xl font-bold font-mono text-blue-400">{simFinalRank}</span>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] leading-relaxed">
                                    💡 <strong>Notice:</strong> As days elapse without access, the rank score naturally decays below the retrieval threshold. High access frequency safely counteracts time decay!
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link to="/test" className="btn btn-primary text-xs">
                                    <span>Test with Custom Queries in Playground</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: CATEGORIES */}
                {activeSection === 'types' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {memoryTypes.map((t, idx) => (
                            <div key={idx} className="app-card p-6 flex flex-col justify-between space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase border border-blue-400`}>
                                            {t.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                                        {t.desc}
                                    </p>
                                </div>
                                <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] font-mono text-[11px] text-[var(--text-muted)] overflow-x-auto">
                                    {t.example}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* TAB 3: LIFECYCLE */}
                {activeSection === 'lifecycle' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {[
                            {
                                step: "01",
                                title: "Active Memory Node",
                                status: "Indexed in pgvector",
                                badge: "Active Query State",
                                desc: "Stored directly with normalized 384-d vector embeddings. Immediately queried during RAG operations and weighted by exponential decay.",
                                color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                            },
                            {
                                step: "02",
                                title: "Archival Memory State",
                                status: "Decayed Below Threshold",
                                badge: "Cold Storage",
                                desc: "When temporal decay reduces final rank below operational thresholds, nodes are preserved in persistent cold storage to protect LLM context windows.",
                                color: "border-amber-500/40 text-amber-400 bg-amber-500/10"
                            },
                            {
                                step: "03",
                                title: "Soft-Deleted & Purged",
                                status: "Audit Maintained",
                                badge: "Safe Removal",
                                desc: "When a user or agent explicitly overrides or deletes a memory node, it is soft-deleted for audit compliance and removed from active vector indexes.",
                                color: "border-rose-500/40 text-rose-400 bg-rose-500/10"
                            }
                        ].map((node, idx) => (
                            <div key={idx} className="app-card p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-mono font-black text-blue-400">{node.step}</span>
                                </div>
                                <h4 className="text-base font-bold text-[var(--text-primary)]">{node.title}</h4>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{node.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* COMPARISON TABLE */}
            <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                        Why EchoGraph Outperforms Standard Approaches
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        How EchoGraph compares to standalone vector databases and raw prompt stuffing.
                    </p>
                </div>

                <div className="app-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-mono">
                                    <th className="p-4">Capability</th>
                                    <th className="p-4 font-bold text-blue-400">EchoGraph Memory Layer</th>
                                    <th className="p-4">Generic SaaS Vector DBs</th>
                                    <th className="p-4">Raw Prompt Stuffing</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                                <tr>
                                    <td className="p-4 font-semibold text-[var(--text-primary)]">Temporal Recency Decay</td>
                                    <td className="p-4 font-bold text-blue-400 flex items-center gap-1.5 font-mono">
                                        <Check color='#50a2ff' className="w-4 h-4" /> Native Exponential Half-Life
                                    </td>
                                    <td className="p-4 text-[var(--text-muted)]">Requires manual application code</td>
                                    <td className="p-4 text-[var(--text-muted)]">None (Static)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-[var(--text-primary)]">Access Frequency Multiplier</td>
                                    <td className="p-4 font-bold text-blue-400 flex items-center gap-1.5 font-mono">
                                        <Check color='#50a2ff' className="w-4 h-4" /> Built-in Dynamic Weighting
                                    </td>
                                    <td className="p-4 text-[var(--text-muted)]">None</td>
                                    <td className="p-4 text-[var(--text-muted)]">None</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-[var(--text-primary)]">ACID Database Native</td>
                                    <td className="p-4 font-bold text-blue-400 flex items-center gap-1.5 font-mono">
                                        <Check color='#50a2ff' className="w-4 h-4" /> PostgreSQL pgvector + Local SQLite
                                    </td>
                                    <td className="p-4 text-[var(--text-muted)]">External SaaS Silo Only</td>
                                    <td className="p-4 text-[var(--text-muted)]">None</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-[var(--text-primary)]">Context Window Cost Reduction</td>
                                    <td className="p-4 font-bold text-blue-400 flex items-center gap-1.5 font-mono">
                                        <Check color='#50a2ff' className="w-4 h-4" /> Up to 40% Token Savings
                                    </td>
                                    <td className="p-4 text-[var(--text-muted)]">Unweighted Top-K</td>
                                    <td className="p-4 text-rose-400 font-mono">High Token Waste</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}