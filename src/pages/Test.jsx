import React, { useState } from 'react';
import Popup from '../assets/elements/Popup';
import { Navigate } from 'react-router-dom';

const demoSampleResults = [
    {
        id: 101,
        content: "User prefers Dark Mode UI with cyan accent buttons and concise code responses.",
        type: "preference",
        final_rank: 1.482,
        distance: 0.215,
        created_at: new Date().toISOString()
    },
    {
        id: 102,
        content: "User is building EchoGraph: long-term RAG memory engine for AI agents using FastAPI & pgvector.",
        type: "fact",
        final_rank: 1.350,
        distance: 0.289,
        created_at: new Date().toISOString()
    },
    {
        id: 103,
        content: "Prefers PostgreSQL with pgvector extension over pinecone or external vector SaaS databases.",
        type: "decision",
        final_rank: 1.210,
        distance: 0.342,
        created_at: new Date().toISOString()
    }
];

const Test = (props) => {
    const [activeTab, setActiveTab] = useState('ingest'); // 'ingest' | 'search'
    const [contextTypeGet, setContextTypeGet] = useState('');
    const [contextTypeSend, setContextTypeSend] = useState('preference');
    const [textInputSend, setTextInputSend] = useState('');
    const [textInputGet, setTextInputGet] = useState("What are the user's UI preferences and tech stack?");
    const [searchResults, setSearchResults] = useState(demoSampleResults);
    const [searching, setSearching] = useState(false);
    const [storing, setStoring] = useState(false);
    const [isDemoData, setIsDemoData] = useState(true);

    if (!props.token) {
        return <Navigate to="/auth" replace />;
    }

    const sendData = async () => {
        if (!textInputSend.trim()) {
            if (props.setPopupText) props.setPopupText('Please enter memory context text');
            return;
        }

        if (!contextTypeSend) {
            if (props.setPopupText) props.setPopupText('Please select a memory category');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            if (props.setPopupText) props.setPopupText('Please login to store memories');
            return;
        }

        setStoring(true);
        const payload = {
            context: textInputSend,
            type: contextTypeSend,
            score: 1.0,
            node_life: 91
        };

        try {
            const response = await fetch(
                "https://echograph-backend-production.up.railway.app/memory",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                if (props.setPopupText) props.setPopupText("Session expired. Please login again");
            } else if (response.status === 200) {
                if (props.setPopupText) props.setPopupText("Memory node successfully ingested into vector store!");
                setTextInputSend('');
            } else {
                if (props.setPopupText) props.setPopupText(data.detail || "An error occurred during ingestion");
            }
        } catch (err) {
            console.log("Error:", err);
            if (props.setPopupText) props.setPopupText("Failed to communicate with API server");
        } finally {
            setStoring(false);
        }
    };

    const getData = async () => {
        if (!textInputGet.trim()) {
            if (props.setPopupText) props.setPopupText('Please enter a semantic search query');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            if (props.setPopupText) props.setPopupText('Please login to query memories');
            return;
        }

        setSearching(true);
        const payload = {
            query: textInputGet,
            type: contextTypeGet || "fact"
        };

        try {
            const response = await fetch(
                "https://echograph-backend-production.up.railway.app/search",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            if (response.ok) {
                setSearchResults(data.results || []);
                setIsDemoData(false);
                if (props.setPopupText) {
                    props.setPopupText(`Found ${data.count || 0} relevant memory nodes`);
                }
            } else {
                if (props.setPopupText) props.setPopupText(data.detail || "Search query failed");
            }
        } catch (err) {
            console.log("Error:", err);
            if (props.setPopupText) props.setPopupText("Failed to retrieve query context");
        } finally {
            setSearching(false);
        }
    };

    const contextOptions = [
        "fact",
        "event",
        "preference",
        "decision",
        "task",
        "goal",
        "relationship",
        "profile",
        "conversation",
        "observation",
        "knowledge",
        "plan",
        "reminder",
        "feedback",
        "emotion",
        "delete"
    ];

    const isDark = props.dark;

    return (
        <div className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#18181c] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Popup text={props.popupText} clearPop={props.clearPop} />
            
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Interactive RAG Sandbox & Live Demo
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Memory Engine <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Playground & Demo</span>
                    </h1>
                    
                    <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Ingest user knowledge, inspect adaptive pgvector rankings, and test real-time semantic retrieval.
                    </p>
                </div>

                {/* Navigation Tabs for Mobile / Desktop */}
                <div className="flex justify-center">
                    <div className={`inline-flex p-1.5 rounded-xl border ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <button
                            onClick={() => setActiveTab('ingest')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                activeTab === 'ingest'
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <span>🧠</span> Memory Ingestion
                        </button>

                        <button
                            onClick={() => setActiveTab('search')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                activeTab === 'search'
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <span>🔍</span> RAG Semantic Search
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* INGESTION PANEL */}
                    <div className={`rounded-2xl p-6 sm:p-8 border transition-all ${
                        activeTab === 'ingest' ? 'ring-2 ring-cyan-500/50' : 'opacity-90'
                    } ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-xl' : 'bg-white border-gray-200 shadow-md'}`}>
                        
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-lg">
                                📥
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">1. Ingest Knowledge Node</h2>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Save structured facts or preferences to vector store</p>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Memory Context Text
                                </label>
                                <textarea
                                    rows={4}
                                    value={textInputSend}
                                    onChange={(e) => setTextInputSend(e.target.value)}
                                    placeholder="e.g. User prefers Python over Node.js and uses dark mode theme for developer UI."
                                    className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                                        isDark 
                                            ? 'bg-gray-950 border-gray-800 text-white placeholder-gray-600' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                                    }`}
                                />
                            </div>

                            {/* Category selector */}
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Category Type ({contextTypeSend})
                                </label>
                                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                                    {contextOptions.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setContextTypeSend(item)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                contextTypeSend === item
                                                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 scale-105'
                                                    : isDark 
                                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={sendData}
                                disabled={storing}
                                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {storing ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Generating Vector Embedding...
                                    </>
                                ) : (
                                    <>
                                        <span>⚡</span> Store Context Memory
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* SEARCH PANEL */}
                    <div className={`rounded-2xl p-6 sm:p-8 border transition-all ${
                        activeTab === 'search' ? 'ring-2 ring-cyan-500/50' : 'opacity-90'
                    } ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-xl' : 'bg-white border-gray-200 shadow-md'}`}>
                        
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-lg">
                                🔎
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">2. Semantic Vector Search</h2>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Retrieve memories using cosine distance and adaptive decay ranking</p>
                            </div>
                        </div>

                        {/* Search Query Area */}
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Search Query String
                                </label>
                                <textarea
                                    rows={4}
                                    value={textInputGet}
                                    onChange={(e) => setTextInputGet(e.target.value)}
                                    placeholder="e.g. What programming language or UI tools does the user prefer?"
                                    className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                                        isDark 
                                            ? 'bg-gray-950 border-gray-800 text-white placeholder-gray-600' 
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                                    }`}
                                />
                            </div>

                            {/* Category filter */}
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Filter Category ({contextTypeGet || 'All Categories'})
                                </label>
                                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                                    <button
                                        type="button"
                                        onClick={() => setContextTypeGet('')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                            contextTypeGet === ''
                                                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                                                : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        All
                                    </button>
                                    {contextOptions.filter(i => i !== 'delete').map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setContextTypeGet(item)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                contextTypeGet === item
                                                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 scale-105'
                                                    : isDark 
                                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={getData}
                                disabled={searching}
                                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {searching ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Searching Vector Space...
                                    </>
                                ) : (
                                    <>
                                        <span>🎯</span> Execute Vector Search
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RESULTS SECTION */}
                {searchResults && searchResults.length > 0 && (
                    <div className={`rounded-2xl p-6 sm:p-8 border mt-8 ${
                        isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white border-gray-200 shadow-xl'
                    }`}>
                        <div className="flex items-center justify-between border-b border-gray-800/50 pb-4 mb-6">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
                                <h3 className="text-xl font-bold">
                                    {isDemoData ? "Interactive Demo Output" : "Retrieved Context Memories"}
                                </h3>
                            </div>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                {isDemoData ? "Sample Demo Vectors" : `${searchResults.length} Matches Found`}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {searchResults.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`p-5 rounded-xl border transition-all hover:border-cyan-500/50 ${
                                        isDark 
                                            ? 'bg-gray-950/80 border-gray-800 hover:bg-gray-950' 
                                            : 'bg-gray-50 border-gray-200 hover:bg-white shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                            {item.type}
                                        </span>
                                        <div className="text-[11px] font-mono text-gray-500 flex items-center gap-3">
                                            <span>Rank: <strong className="text-cyan-400">{(item.final_rank || 0).toFixed(3)}</strong></span>
                                            <span>Distance: <strong>{(item.distance || 0).toFixed(3)}</strong></span>
                                        </div>
                                    </div>
                                    <p className={`text-sm leading-relaxed font-sans ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                        "{item.content}"
                                    </p>
                                    <div className="mt-3 pt-3 border-t border-gray-800/40 flex justify-between items-center text-[10px] text-gray-500">
                                        <span>Node ID: #{item.id}</span>
                                        <span>Stored: {new Date(item.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Test;