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
        <div className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#111111] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
            <Popup text={props.popupText} clearPop={props.clearPop} />
            
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Memory Engine <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>Playground & Demo</span>
                    </h1>
                    
                    <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Ingest user knowledge, inspect adaptive pgvector rankings, and test real-time semantic retrieval.
                    </p>
                </div>

                {/* Navigation Tabs for Mobile / Desktop */}
                <div className="flex justify-center">
                    <div className={`inline-flex p-1.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <button
                            onClick={() => setActiveTab('ingest')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                activeTab === 'ingest'
                                    ? 'bg-blue-600 text-white'
                                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Memory Ingestion
                        </button>

                        <button
                            onClick={() => setActiveTab('search')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                activeTab === 'search'
                                    ? 'bg-blue-600 text-white'
                                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            RAG Semantic Search
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* INGESTION PANEL */}
                    <div className={`rounded-2xl p-6 sm:p-8 border transition-all ${
                        activeTab === 'ingest' ? (isDark ? 'border-blue-500' : 'border-blue-600') : 'opacity-90'
                    } ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        
                        <div className="flex items-center space-x-3 mb-6">
                            <div>
                                <h2 className="text-xl font-bold">Ingest Knowledge Node</h2>
                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Save structured facts or preferences to vector store</p>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Memory Context Text
                                </label>
                                <textarea
                                    rows={4}
                                    value={textInputSend}
                                    onChange={(e) => setTextInputSend(e.target.value)}
                                    placeholder="e.g. User prefers Python over Node.js and uses dark mode theme for developer UI."
                                    className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                        isDark 
                                            ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                                    }`}
                                />
                            </div>

                            {/* Category selector */}
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Category Type ({contextTypeSend})
                                </label>
                                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                                    {contextOptions.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setContextTypeSend(item)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                                contextTypeSend === item
                                                    ? 'bg-blue-600 text-white border-blue-600 scale-105'
                                                    : isDark 
                                                        ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                                                        : 'bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300'
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
                                className={`w-full mt-4 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${isDark ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-slate-900 text-white hover:bg-black'}`}
                            >
                                {storing ? (
                                    <>
                                        <span className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-slate-900' : 'border-white'}`}></span>
                                        Generating Vector Embedding...
                                    </>
                                ) : (
                                    <>
                                        Store Context Memory
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* SEARCH PANEL */}
                    <div className={`rounded-2xl p-6 sm:p-8 border transition-all ${
                        activeTab === 'search' ? (isDark ? 'border-blue-500' : 'border-blue-600') : 'opacity-90'
                    } ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        
                        <div className="flex items-center space-x-3 mb-6">
                            <div>
                                <h2 className="text-xl font-bold">Semantic Vector Search</h2>
                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Retrieve memories using cosine distance and adaptive decay ranking</p>
                            </div>
                        </div>

                        {/* Search Query Area */}
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Search Query String
                                </label>
                                <textarea
                                    rows={4}
                                    value={textInputGet}
                                    onChange={(e) => setTextInputGet(e.target.value)}
                                    placeholder="e.g. What programming language or UI tools does the user prefer?"
                                    className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                        isDark 
                                            ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                                    }`}
                                />
                            </div>

                            {/* Category filter */}
                            <div>
                                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Filter Category ({contextTypeGet || 'All Categories'})
                                </label>
                                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                                    <button
                                        type="button"
                                        onClick={() => setContextTypeGet('')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                            contextTypeGet === ''
                                                ? 'bg-blue-600 text-white border-blue-600 scale-105'
                                                : isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300'
                                        }`}
                                    >
                                        All
                                    </button>
                                    {contextOptions.filter(i => i !== 'delete').map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setContextTypeGet(item)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                                contextTypeGet === item
                                                    ? 'bg-blue-600 text-white border-blue-600 scale-105'
                                                    : isDark 
                                                        ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                                                        : 'bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300'
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
                                className={`w-full mt-4 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${isDark ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-slate-900 text-white hover:bg-black'}`}
                            >
                                {searching ? (
                                    <>
                                        <span className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-slate-900' : 'border-white'}`}></span>
                                        Searching Vector Space...
                                    </>
                                ) : (
                                    <>
                                        Execute Vector Search
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RESULTS SECTION */}
                {searchResults && searchResults.length > 0 && (
                    <div className={`rounded-2xl p-6 sm:p-8 border mt-8 ${
                        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                        <div className={`flex items-center justify-between border-b pb-4 mb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold">
                                    {isDemoData ? "Interactive Demo Output" : "Retrieved Context Memories"}
                                </h3>
                            </div>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${isDark ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-slate-100 text-blue-600 border-slate-200'}`}>
                                {isDemoData ? "Demo Outputs" : `${searchResults.length} Matches Found`}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {searchResults.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`p-5 rounded-xl border transition-all ${
                                        isDark 
                                            ? 'bg-slate-950 border-slate-800 hover:border-blue-500' 
                                            : 'bg-slate-50 border-slate-200 hover:border-blue-500 shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${isDark ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-slate-100 text-blue-600 border-slate-200'}`}>
                                            {item.type}
                                        </span>
                                        <div className={`text-[11px] font-mono flex items-center gap-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                            <span>Rank: <strong className={isDark ? 'text-blue-400' : 'text-blue-600'}>{(item.final_rank || 0).toFixed(3)}</strong></span>
                                            <span>Distance: <strong>{(item.distance || 0).toFixed(3)}</strong></span>
                                        </div>
                                    </div>
                                    <p className={`text-sm leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        "{item.content}"
                                    </p>
                                    <div className={`mt-3 pt-3 border-t flex justify-between items-center text-[10px] ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
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