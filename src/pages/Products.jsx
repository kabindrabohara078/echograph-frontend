import React, { useState } from 'react';
import { Shield, Cpu, Database, Code, CheckCircle, Terminal, Layers, ArrowRight } from 'lucide-react';

export default function ProductsPage(props) {
    const [activeTab, setActiveTab] = useState('python');

    // Dynamic Code Blocks for the MVP snippet preview
    const codeSnippets = {
        python: `import requests

# Query the EchoGraph MVP Core Engine
url = "https://api.echograph.ai/v1/memory/retrieve"
payload = {
    "user_id": "usr_948271",
    "query": "What database configuration does the user prefer?",
    "top_k": 3
}

response = requests.post(url, json=payload)
memories = response.json()

print(f"Surfaced {len(memories)} relevant context layers.")`,
        javascript: `// Initialize EchoGraph Retrieval Pipeline
const fetchContext = async () => {
  const response = await fetch('https://api.echograph.ai/v1/memory/retrieve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: "usr_948271",
      query: "What database configuration does the user prefer?",
      top_k: 3
    })
  });
  
  const memories = await response.json();
  console.log(\`Retrieved Top \${memories.length} memory arrays.\`);
};`
    };

    return (
        <div className={`${props.dark ? 'bg-[#222]' : 'bg-gray-100'} text-gray-100 min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 pt-24`}>
            {/* Background Decorative Grid/Orbs */}
            <div className="absolute w-full h-[60vh] bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
            <div className="absolute w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl top-40 right-10 -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* ================================================= */}
                {/* 1. HERO HEADER */}
                {/* ================================================= */}
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs font-semibold text-blue-400 tracking-wide">
                        Product Core Engine v1.0 (MVP)
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
                        style={{
                            color: props.dark ? 'white' : 'black'
                        }}
                    >
                        Cognitive State Management for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Autonomous Agents</span>
                    </h1>
                    <p
                        style={{
                            color: props.dark ? 'white' : 'black'
                        }}
                        className="text-gray-400 text-base sm:text-lg leading-relaxed">
                        Stop building boilerplate similarity calculation scripts. Outsource your AI’s episodic memory storage to an instantly accessible semantic retrieval microservice.
                    </p>
                </div>

                {/* ================================================= */}
                {/* 2. THE CHOSEN MVP SPECIFICATION BOX */}
                {/* ================================================= */}
                <div
                    style={{
                        backgroundColor: props.dark ? 'black' : 'white'
                        // backgroundColor:'red'
                    }}
                    className=" border border-gray-800 rounded-2xl p-8 mb-20 shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"><Layers size={20} /></span>
                                <h2
                                    style={{
                                        color: props.dark ? 'white' : 'black',

                                    }}
                                    className="text-xl font-bold text-white">Dynamic Context Core</h2>
                            </div>
                            <p
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-gray-400 text-sm leading-relaxed">
                                Our active production model evaluates vector embeddings across your user clusters, identifying hidden semantic links and returning the **Top 3 absolute best matches** matching your agent's immediate prompt request.
                            </p>

                            <ul className="space-y-3 text-xs text-gray-300 font-medium">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={14} className="text-emerald-400" />
                                    <span
                                        style={{
                                            color: props.dark ? 'white' : 'black'
                                        }}
                                    >High-performance MongoDB Atlas Vector Search integration</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={14} className="text-emerald-400" />
                                    <span
                                        style={{
                                            color: props.dark ? 'white' : 'black'
                                        }}
                                    >Consolidated Top-3 Retrieval limits to drastically optimize LLM context window costs</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle size={14} className="text-emerald-400" />
                                    <span
                                        style={{
                                            color: props.dark ? 'white' : 'black'
                                        }}
                                    >Strict multi-tenant token isolation routines</span>
                                </li>
                            </ul>
                        </div>

                        {/* Interactive Code Implementation Playground */}
                        <div className="lg:col-span-7 bg-black border border-gray-800/80 rounded-xl overflow-hidden font-mono text-xs shadow-2xl">
                            <div className="bg-gray-900/60 px-4 py-3 border-b border-gray-800/80 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Terminal size={14} className="text-cyan-400" />
                                    <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wider">REST Integration Engine</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab('python')}
                                        className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'python' ? 'bg-gray-800 text-cyan-400 font-semibold' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        Python
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('javascript')}
                                        className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'javascript' ? 'bg-gray-800 text-cyan-400 font-semibold' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        Node.js
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 overflow-x-auto text-gray-300 leading-relaxed max-h-[250px]">
                                <pre>{codeSnippets[activeTab]}</pre>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================================================= */}
                {/* 3. HARDWARE VECTOR SPECS GRID */}
                {/* ================================================= */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h3
                            style={{
                                color: props.dark ? 'white' : 'black'
                            }}
                            className="text-2xl font-bold text-white">Under the Cognitive Hood</h3>
                        <p
                            style={{
                                color: props.dark ? 'white' : 'black'
                            }}
                            className="text-sm text-gray-500 mt-1">Sleek tech stack built for sub-millisecond retrieval profiles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div
                            style={{                    backgroundColor: props.dark? 'black':'white'

                            }}
                            className="bg-gray-900/20 border border-gray-800 p-6 rounded-xl space-y-3">
                            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center"><Database size={18} /></div>
                            <h4
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-base font-bold text-white">MongoDB Vector Search</h4>
                            <p
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-gray-400 text-xs leading-relaxed">
                                Utilizes hierarchical navigable small world (HNSW) indexing paths inside document stores for clean clustering metrics.
                            </p>
                        </div>

                        <div
                            style={{                    backgroundColor: props.dark? 'black':'white'

                            }}
                            className="bg-gray-900/20 border border-gray-800 p-6 rounded-xl space-y-3">
                            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center"><Cpu size={18} /></div>
                            <h4
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-base font-bold text-white">Top-3 Optimization</h4>
                            <p
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-gray-400 text-xs leading-relaxed">
                                Filters noisy or low-confidence nodes dynamically. Returns only high-impact contextual vectors directly to prompt arrays.
                            </p>
                        </div>

                        <div
                            style={{                    backgroundColor: props.dark? 'black':'white'

                            }}
                            className="bg-gray-900/20 border border-gray-800 p-6 rounded-xl space-y-3">
                            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center"><Code size={18} /></div>
                            <h4
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-base font-bold text-white">JSON Ingestion Protocol</h4>
                            <p
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                                className="text-gray-400 text-xs leading-relaxed">
                                Accepts unstructured text files, automatically chunks structures, builds array vectors, and yields retrieval states instantly.
                            </p>
                        </div>

                    </div>
                </div>

                {/* ================================================= */}
                {/* 4. PRODUCT ROADMAP STEPS (THE ARCHITECTURAL SHIFT) */}
                {/* ================================================= */}
                <div
                    style={{                    backgroundColor: props.dark? 'black':'white'

                    }}
                    className="border border-gray-800/80 rounded-2xl p-8 text-center max-w-4xl mx-auto space-y-6">
                    <div
                        style={{
                            color: props.dark ? 'white' : 'black'
                        }}
                        className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">
                        Future Horizon Integration
                    </div>
                    <div className="space-y-2">
                        <h3
                            style={{
                                color: props.dark ? 'white' : 'black'
                            }}
                            className="text-xl font-bold text-white">Migrating Toward the Relational pgvector Cluster</h3>
                        <p
                            style={{
                                color: props.dark ? 'white' : 'black'
                            }}
                            className="text-gray-400 text-xs max-w-xl mx-auto leading-relaxed">
                            While our current MVP architecture accurately pushes Top-3 vectors straight from Mongo, we are preparing the enterprise layout shift toward **FastAPI + PostgreSQL + pgvector**.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <div className="bg-black/40 border border-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                            >Current: Mongo Document Arrays</span>
                        </div>
                        <ArrowRight size={16} className="text-gray-600 hidden sm:block" />
                        <div className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-400 flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            <span
                                style={{
                                    color: props.dark ? 'white' : 'black'
                                }}
                            >Next Core: Relational Adaptive Graphs (pgvector)</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}