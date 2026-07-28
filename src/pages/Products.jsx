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
            icon: <Database className="w-6 h-6 text-cyan-400" />,
            desc: "FastAPI microservice integrated natively with PostgreSQL and pgvector for sub-10ms semantic similarity queries.",
            features: ["pgvector HNSW Indexing", "Sentence-Transformer Embeddings", "Multi-Tenant Row Isolation"]
        },
        {
            title: "Adaptive Recency Ranking Middleware",
            tag: "Mathematical Decay",
            icon: <Cpu className="w-6 h-6 text-blue-400" />,
            desc: "Automatic temporal exponential decay scoring that dynamically weights context based on age and access ratios.",
            features: ["Exponential Recency Curve", "Frequency Multiplier", "Automatic Node Archival"]
        },
        {
            title: "Interactive RAG Playground & API",
            tag: "Developer Tools",
            icon: <Terminal className="w-6 h-6 text-amber-400" />,
            desc: "Test context ingestion and semantic vector retrieval interactively before shipping to production AI agents.",
            features: ["Real-time Similarity Scoring", "Category Filtering", "Interactive Debugger"]
        }
    ];

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#18181c] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* HERO HEADER */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
                    <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3.5 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        EchoGraph Product Suite
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Cognitive Infrastructure for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Autonomous AI</span>
                    </h1>
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Outsource long-term episodic memory storage to our high-performance PostgreSQL + pgvector microservice engine.
                    </p>
                </div>

                {/* PRODUCTS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {productsList.map((prod, idx) => (
                        <div key={idx} className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-xl' : 'bg-white border-gray-200 shadow-md'}`}>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                        {prod.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                        {prod.tag}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{prod.title}</h3>
                                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {prod.desc}
                                </p>
                                <ul className="space-y-2 mb-6 text-xs font-semibold">
                                    {prod.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/test" className="w-full text-center bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold py-2.5 rounded-xl transition-all">
                                Try in Playground →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CODE INTEGRATION & REST ENGINE BOX */}
                <div className={`rounded-3xl p-6 sm:p-10 border ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-2xl' : 'bg-white border-gray-200 shadow-lg'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"><Layers size={20} /></span>
                                <h2 className="text-2xl font-bold">FastAPI + pgvector Core</h2>
                            </div>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                Evaluates 384-dimensional vector embeddings across user partitions, calculating cosine distance and applying exponential time decay in microseconds.
                            </p>
                            <ul className="space-y-3 text-xs font-medium">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                                    <span>Native PostgreSQL Vector Search (384-d sentence-transformers)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                                    <span>Reduces LLM prompt context window cost by up to 40%</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                                    <span>Strict JWT token multi-tenant isolation</span>
                                </li>
                            </ul>
                        </div>

                        {/* Interactive Code Implementation */}
                        <div className={`lg:col-span-7 rounded-2xl overflow-hidden font-mono text-xs border ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-900 text-gray-200 border-gray-800'}`}>
                            <div className="bg-gray-900/90 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Terminal size={14} className="text-cyan-400" />
                                    <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wider">REST API Integration</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab('python')}
                                        className={`px-2.5 py-1 rounded text-xs transition-colors ${activeTab === 'python' ? 'bg-cyan-500 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Python
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('javascript')}
                                        className={`px-2.5 py-1 rounded text-xs transition-colors ${activeTab === 'javascript' ? 'bg-cyan-500 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Node.js
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 overflow-x-auto leading-relaxed">
                                <pre className="text-gray-300">{codeSnippets[activeTab]}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HARDWARE & SPECS GRID */}
                <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold">Under the Cognitive Hood</h3>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sleek tech stack built for sub-millisecond retrieval profiles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Database size={20} className="text-emerald-400" />,
                                title: "PostgreSQL & pgvector",
                                desc: "Utilizes HNSW indexing paths inside relational database engines for clean clustering metrics."
                            },
                            {
                                icon: <Cpu size={20} className="text-cyan-400" />,
                                title: "Cosine & Rank Optimization",
                                desc: "Filters noisy or low-confidence nodes dynamically. Returns high-impact contextual vectors directly to prompt arrays."
                            },
                            {
                                icon: <Code size={20} className="text-blue-400" />,
                                title: "JSON Ingestion Protocol",
                                desc: "Accepts unstructured text, automatically builds vector embeddings, and yields retrieval states instantly."
                            }
                        ].map((spec, i) => (
                            <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                                <div className="p-2.5 rounded-xl bg-gray-800/40 w-fit mb-4">{spec.icon}</div>
                                <h4 className="text-base font-bold mb-2">{spec.title}</h4>
                                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{spec.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}