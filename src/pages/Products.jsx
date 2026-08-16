import React, { useState } from 'react';
import { Shield, Cpu, Database, Code, CheckCircle, Terminal, Layers, ArrowRight, Sparkles, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductsPage(props) {
    const [activeTab, setActiveTab] = useState('python');
    const isDark = props.dark;

    const codeSnippets = {
        python: `import requests

# Query EchoGraph Core RAG Engine
url = "http://localhost:8000/search"
headers = {"Authorization": "Bearer YOUR_JWT_TOKEN"}
payload = {
    "query": "What database configuration does the user prefer?",
    "type": "preference"
}

response = requests.post(url, headers=headers, json=payload)
results = response.json().get("results", [])

print(f"Surfaced {len(results)} relevant memory nodes.")`,
        javascript: `// Retrieve Context from EchoGraph API
const fetchContext = async (userToken) => {
  const response = await fetch('http://localhost:8000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${userToken}\`
    },
    body: JSON.stringify({
      query: "What database configuration does the user prefer?",
      type: "preference"
    })
  });
  
  const data = await response.json();
  console.log(\`Retrieved Top \${data.results.length} memory arrays.\`);
};`
    };

    const productsList = [
        {
            title: "EchoGraph Vector Memory Engine",
            tag: "Core Engine v1.0",
            icon: <Database className="w-6 h-6 text-blue-500" />,
            desc: "FastAPI microservice integrated natively with PostgreSQL and pgvector for sub-10ms semantic similarity queries.",
            features: ["pgvector HNSW Indexing", "Sentence-Transformer Embeddings", "Multi-Tenant Row Isolation"]
        },
        {
            title: "Adaptive Recency Ranking Middleware",
            tag: "Mathematical Decay",
            icon: <Cpu className="w-6 h-6 text-blue-500" />,
            desc: "Automatic temporal exponential decay scoring that dynamically weights context based on age and access ratios.",
            features: ["Exponential Recency Curve", "Frequency Multiplier", "Automatic Node Archival"]
        },
        {
            title: "Interactive RAG Playground & API",
            tag: "Developer Tools",
            icon: <Terminal className="w-6 h-6 text-blue-500" />,
            desc: "Test context ingestion and semantic vector retrieval interactively before shipping to production AI agents.",
            features: ["Real-time Similarity Scoring", "Category Filtering", "Interactive Debugger"]
        }
    ];

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#111111] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* HERO HEADER */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Cognitive Infrastructure for <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Autonomous AI</span>
                    </h1>
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Outsource long-term episodic memory storage to our high-performance PostgreSQL + pgvector microservice engine.
                    </p>
                </div>

                {/* PRODUCTS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {productsList.map((prod, idx) => (
                        <div key={idx} className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all hover:-translate-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                                        {prod.icon}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                        {prod.tag}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{prod.title}</h3>
                                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {prod.desc}
                                </p>
                                <ul className="space-y-2 mb-6 text-xs font-semibold">
                                    {prod.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/test" className={`w-full text-center border text-xs font-bold py-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>
                                Try in Playground →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CODE INTEGRATION & REST ENGINE BOX */}
                <div className={`rounded-3xl p-6 sm:p-10 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-slate-100 border-slate-200 text-blue-600'}`}><Layers size={20} /></span>
                                <h2 className="text-2xl font-bold">FastAPI + pgvector Core</h2>
                            </div>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                Evaluates 384-dimensional vector embeddings across user partitions, calculating cosine distance and applying exponential time decay in microseconds.
                            </p>
                            <ul className="space-y-3 text-xs font-medium">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                    <span>Native PostgreSQL Vector Search (384-d sentence-transformers)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                    <span>Reduces LLM prompt context window cost by up to 40%</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                    <span>Strict JWT token multi-tenant isolation</span>
                                </li>
                            </ul>
                        </div>

                        {/* Interactive Code Implementation */}
                        <div className={`lg:col-span-7 rounded-2xl overflow-hidden font-mono text-xs border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                            <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                                <div className="flex items-center space-x-2">
                                    <Terminal size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
                                    <span className={`font-bold text-[11px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>REST API Integration</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab('python')}
                                        className={`px-2.5 py-1 rounded text-xs transition-colors ${activeTab === 'python' ? 'bg-blue-500 text-white font-bold' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black')}`}
                                    >
                                        Python
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('javascript')}
                                        className={`px-2.5 py-1 rounded text-xs transition-colors ${activeTab === 'javascript' ? 'bg-blue-500 text-white font-bold' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black')}`}
                                    >
                                        Node.js
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 overflow-x-auto leading-relaxed">
                                <pre className={isDark ? "text-slate-300" : "text-slate-700"}>{codeSnippets[activeTab]}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HARDWARE & SPECS GRID */}
                <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold">Under the Cognitive Hood</h3>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sleek tech stack built for sub-millisecond retrieval profiles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Database size={20} className="text-blue-500" />,
                                title: "PostgreSQL & pgvector",
                                desc: "Utilizes HNSW indexing paths inside relational database engines for clean clustering metrics."
                            },
                            {
                                icon: <Cpu size={20} className="text-blue-500" />,
                                title: "Cosine & Rank Optimization",
                                desc: "Filters noisy or low-confidence nodes dynamically. Returns high-impact contextual vectors directly to prompt arrays."
                            },
                            {
                                icon: <Code size={20} className="text-blue-500" />,
                                title: "JSON Ingestion Protocol",
                                desc: "Accepts unstructured text, automatically builds vector embeddings, and yields retrieval states instantly."
                            }
                        ].map((spec, i) => (
                            <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <div className={`p-2.5 rounded-xl w-fit mb-4 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>{spec.icon}</div>
                                <h4 className="text-base font-bold mb-2">{spec.title}</h4>
                                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{spec.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}