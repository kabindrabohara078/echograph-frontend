import React, { useState } from 'react';
import { Database, Cpu, Zap, Activity, Layers, ShieldCheck, RefreshCw, BarChart3, Check } from 'lucide-react';

export default function Memory(props) {
    const [activeSection, setActiveSection] = useState('ranking');
    const isDark = props.dark;

    const memoryTypes = [
        { name: "preference", color: "from-cyan-500 to-blue-500", desc: "User habits, preferred languages, UI mode, and formatting guidelines." },
        { name: "fact", color: "from-blue-500 to-indigo-500", desc: "Verifiable truths, codebase structures, and static project configurations." },
        { name: "decision", color: "from-purple-500 to-pink-500", desc: "Architectural choices, database selection reasons, and policy rules." },
        { name: "goal", color: "from-emerald-500 to-teal-500", desc: "Target milestones, project deadlines, and autonomous agent objectives." },
        { name: "event", color: "from-amber-500 to-orange-500", desc: "Historical system actions, user interactions, and chronological events." }
    ];

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#18181c] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* HERO SECTION */}
                <div className="text-center space-y-4 max-w-4xl mx-auto pt-6">
                    <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3.5 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Cognitive Memory Architecture
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Deep Dive into the <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Memory Engine</span>
                    </h1>
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        EchoGraph is not just another vector wrapper. It's an adaptive cognitive layer that balances semantic vector similarity, temporal decay, and retrieval access frequency in real time.
                    </p>
                </div>

                {/* ARCHITECTURE METRIC STRIP */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {[
                        { title: "Embedding Dim", value: "384-d", label: "Sentence Transformers", icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
                        { title: "Vector Engine", value: "pgvector", label: "PostgreSQL Native", icon: <Database className="w-5 h-5 text-blue-400" /> },
                        { title: "Query Latency", value: "< 8ms", label: "HNSW Index Path", icon: <Zap className="w-5 h-5 text-amber-400" /> },
                        { title: "Decay Function", value: "Half-Life", label: "Exponential Recency", icon: <Activity className="w-5 h-5 text-purple-400" /> }
                    ].map((m, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{m.title}</span>
                                {m.icon}
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{m.value}</div>
                            <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{m.label}</div>
                        </div>
                    ))}
                </div>

                {/* INTERACTIVE COMPONENT SHOWCASE */}
                <div className={`rounded-3xl p-6 sm:p-10 border ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-2xl' : 'bg-white border-gray-200 shadow-lg'}`}>
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">How Memory Nodes Evolve</h2>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Select an architectural subsystem to explore EchoGraph's internal mathematical ranking pipeline.</p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <div className={`inline-flex p-1.5 rounded-xl border ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
                            {[
                                { id: 'ranking', name: 'Adaptive Ranking Formula', icon: '📊' },
                                { id: 'types', name: 'Memory Categories', icon: '🏷️' },
                                { id: 'lifecycle', name: 'Node Lifecycle & Decay', icon: '⏳' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSection(tab.id)}
                                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                                        activeSection === tab.id
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                                            : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <span>{tab.icon}</span> {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TAB CONTENT: RANKING */}
                    {activeSection === 'ranking' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                                    Mathematical Scoring Model
                                </span>
                                <h3 className="text-2xl font-bold">Dynamic Final Rank Formula</h3>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    EchoGraph does not rely on raw cosine distance alone. We multiply semantic similarity by an exponential time decay curve and an access ratio multiplier to ensure recent & frequently relevant context rises to the top.
                                </p>
                                <div className={`p-4 rounded-xl font-mono text-sm border ${isDark ? 'bg-gray-950 border-cyan-500/30 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-900'}`}>
                                    Final Rank = (1 - Distance) × Importance × e<sup>-(Δt / HalfLife)</sup> × (1 + AccessRatio)
                                </div>
                            </div>
                            <div className={`p-6 rounded-2xl border font-mono text-xs ${isDark ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-900 text-gray-200'}`}>
                                <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-4 text-cyan-400 font-bold">
                                    <span>// Ranking Calculation Log</span>
                                    <span>node_id #8492</span>
                                </div>
                                <pre className="space-y-1.5 overflow-x-auto">
{`{
  "content": "User prefers PostgreSQL with pgvector",
  "vector_distance": 0.182,
  "semantic_similarity": 0.818,
  "importance_score": 0.95,
  "days_elapsed": 2.4,
  "half_life_days": 91,
  "decay_factor": 0.981,
  "access_ratio": 0.35,
  "FINAL_RANK": 1.034
}`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* TAB CONTENT: CATEGORIES */}
                    {activeSection === 'types' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {memoryTypes.map((t, idx) => (
                                <div key={idx} className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? 'bg-gray-950/80 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase text-white bg-gradient-to-r ${t.color}`}>
                                            {t.name}
                                        </span>
                                    </div>
                                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB CONTENT: LIFECYCLE */}
                    {activeSection === 'lifecycle' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "1. Active State", status: "Active Node", desc: "Stored in pgvector with full index visibility. Actively queried during RAG operations.", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                                { title: "2. Archival State", status: "Archived", desc: "Node life decays past threshold. Moved to persistent cold store to preserve LLM context budget.", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
                                { title: "3. Soft Cleanup", status: "Soft-Deleted", desc: "User explicitly deletes or overwrites memory. Flagged as soft-deleted for audit compliance.", color: "text-red-400 border-red-500/30 bg-red-500/10" }
                            ].map((step, idx) => (
                                <div key={idx} className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${step.color}`}>
                                        {step.status}
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* COMPARISON TABLE */}
                <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold">Why EchoGraph vs Standard Alternatives</h2>
                        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>How EchoGraph compares to generic vector databases and stateless prompts.</p>
                    </div>

                    <div className={`overflow-x-auto rounded-2xl border ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-md'}`}>
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-gray-800 bg-gray-950/80 text-gray-300' : 'border-gray-200 bg-gray-100 text-gray-700'}`}>
                                    <th className="p-4 font-bold">Feature</th>
                                    <th className="p-4 font-bold text-cyan-400">EchoGraph Engine</th>
                                    <th className="p-4 font-bold">Generic Vector DBs</th>
                                    <th className="p-4 font-bold">Raw Prompt Context</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? 'divide-gray-800/60 text-gray-300' : 'divide-gray-200 text-gray-600'}`}>
                                <tr>
                                    <td className="p-4 font-medium">Temporal Recency Decay</td>
                                    <td className="p-4 text-cyan-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Native Exponential</td>
                                    <td className="p-4 text-gray-500">Manual Code Required</td>
                                    <td className="p-4 text-gray-500">None</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">Access Frequency Weighting</td>
                                    <td className="p-4 text-cyan-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Built-in Ratio</td>
                                    <td className="p-4 text-gray-500">None</td>
                                    <td className="p-4 text-gray-500">None</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">pgvector & Postgres Native</td>
                                    <td className="p-4 text-cyan-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Yes (RDBMS + Vectors)</td>
                                    <td className="p-4 text-gray-500">External SaaS Only</td>
                                    <td className="p-4 text-gray-500">None</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">Context Window Cost Reduction</td>
                                    <td className="p-4 text-cyan-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Up to 40% Token Savings</td>
                                    <td className="p-4 text-gray-500">Variable</td>
                                    <td className="p-4 text-gray-500">Expensive Overflow</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}