import React, { useState } from 'react';
import { 
    Database, 
    Cpu, 
    Terminal, 
    Layers, 
    CheckCircle2, 
    Copy, 
    Check, 
    ArrowRight, 
    Sparkles, 
    Code2, 
    Shield, 
    Server
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductsPage(props) {
    const [activeTab, setActiveTab] = useState('python');
    const [copied, setCopied] = useState(false);

    const codeSnippets = {
        python: `import requests

API_URL = "http://localhost:8000"
headers = {"Authorization": "Bearer YOUR_JWT_TOKEN"}

# 1. Ingest Semantic Memory
payload = {
    "context": "User prefers FastAPI microservices with PostgreSQL",
    "type": "preference",
    "importance": 0.95
}
requests.post(f"{API_URL}/memory", headers=headers, json=payload)

# 2. Query with Adaptive Ranking & Recency Decay
query_payload = {
    "query": "What backend framework does the user prefer?",
    "type": "preference"
}
response = requests.post(f"{API_URL}/search", headers=headers, json=query_payload)
results = response.json().get("results", [])

for item in results:
    print(f"Match: {item['content']} (Rank Score: {item['final_rank']})")`,

        javascript: `// Ingest and Retrieve Memory via EchoGraph API
const API_URL = "http://localhost:8000";
const token = "YOUR_JWT_TOKEN";

// 1. Ingest
await fetch(\`\${API_URL}/memory\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify({
    context: "User prefers FastAPI microservices with PostgreSQL",
    type: "preference",
    importance: 0.95
  })
});

// 2. Query with Decay Ranking
const res = await fetch(\`\${API_URL}/search\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify({
    query: "What backend framework does the user prefer?",
    type: "preference"
  })
});

const data = await res.json();
console.log("Top Ranked Memories:", data.results);`,

        curl: `# 1. Ingest Context
curl -X POST http://localhost:8000/memory \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "context": "User prefers FastAPI microservices with PostgreSQL",
    "type": "preference",
    "importance": 0.95
  }'

# 2. Search Memories with Decay Ranking
curl -X POST http://localhost:8000/search \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What backend framework does the user prefer?",
    "type": "preference"
  }'`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippets[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const productsList = [
        {
            title: "EchoGraph Vector Memory Engine",
            tag: "Core Engine v2.0",
            icon: <Database color='#50a2ff' className="w-5 h-5 text-blue-400" />,
            desc: "FastAPI microservice integrated natively with PostgreSQL and pgvector for sub-8ms semantic similarity queries and isolated user namespaces.",
            features: [
                "pgvector HNSW Indexing",
                "Sentence-Transformers 384-d",
                "Offline SQLite Zero-Config Mode",
                "Multi-Tenant JWT Isolation"
            ]
        },
        {
            title: "Adaptive Recency Ranking Middleware",
            tag: "Mathematical Decay",
            icon: <Cpu color='#50a2ff' className="w-5 h-5 text-cyan-400" />,
            desc: "Automatic temporal exponential decay scoring that dynamically weights context based on age, user priority, and access ratios.",
            features: [
                "Exponential Recency Curve",
                "Query Frequency Multiplier",
                "Zero-Maintenance Auto Decay",
                "Context Window Optimization"
            ]
        },
        {
            title: "Interactive Sandbox & API Playground",
            tag: "Developer Tools",
            icon: <Terminal color='#50a2ff' className="w-5 h-5 text-emerald-400" />,
            desc: "Live visual testbed to ingest unstructured statements, inspect vector distances, and debug similarity scores before shipping to autonomous agents.",
            features: [
                "Real-Time Similarity Meters",
                "Distance & Latency Tracker",
                "Quick Pre-populated Prompts",
                "Single-Click Node Deletion"
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <br />
            <br />
            {/* HERO HEADER */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Stateful Infrastructure for{' '}
                    <span className="text-blue-400">
                        Autonomous Agents
                    </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                    Eliminate context limits and memory amnesia. Outsource long-term episodic memory storage to our high-performance PostgreSQL + pgvector microservice.
                </p>
            </div>

            {/* PRODUCTS CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productsList.map((prod, idx) => (
                    <div key={idx} className="app-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">
                                {prod.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                {prod.desc}
                            </p>
                            <ul className="space-y-2 pt-2 text-xs font-medium">
                                {prod.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-2 text-[var(--text-secondary)]">
                                        <CheckCircle2 color='#50a2ff' className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to="/test" className="btn btn-secondary w-full text-xs font-semibold">
                            <span>Test in Playground</span>
                        </Link>
                    </div>
                ))}
            </div>

            {/* CODE INTEGRATION & REST ENGINE BOX */}
            <div className="app-card p-6 sm:p-10 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-5 space-y-5">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
                                <Layers className="w-5 h-5 text-blue-400" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                                FastAPI + pgvector Core
                            </h2>
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                            EchoGraph evaluates 384-dimensional vector embeddings across isolated user namespaces, calculating cosine distance and applying exponential time decay in microseconds.
                        </p>

                        <div className="space-y-3 text-xs text-[var(--text-secondary)] pt-2">
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 color='#50a2ff' className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[var(--text-primary)]">Multi-Tenant JWT Isolation:</strong> Queries strictly isolate user vector arrays.
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 color='#50a2ff' className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[var(--text-primary)]">Up to 40% Token Reductions:</strong> Precision retrieval eliminates LLM context stuffing.
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 color='#50a2ff' className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[var(--text-primary)]">Zero SaaS Vendor Lock-In:</strong> Open-source PostgreSQL + pgvector architecture.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Code terminal with tabs */}
                    <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)] font-mono text-xs">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-blue-400" />
                                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                                    Integration Code
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {['python', 'javascript', 'curl'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveTab(lang)}
                                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors capitalize ${
                                            activeTab === lang
                                                ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-bold border border-[var(--border-color)]'
                                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                        }`}
                                    >
                                        {lang === 'javascript' ? 'Node.js' : lang}
                                    </button>
                                ))}
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-1"
                                    title="Copy Code"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>

                        <div className="p-5 overflow-x-auto leading-relaxed">
                            <pre className="text-[var(--text-secondary)]">
                                {codeSnippets[activeTab]}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* HARDWARE & SPECS GRID */}
            <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">Technical Specifications</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        Lightweight, production-ready stack designed for sub-millisecond retrieval profiles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Database color='#50a2ff' className="w-5 h-5 text-blue-400" />,
                            title: "PostgreSQL & pgvector",
                            desc: "Utilizes HNSW index paths inside relational database engines for high recall and microsecond neighbor lookups."
                        },
                        {
                            icon: <Cpu color='#50a2ff' className="w-5 h-5 text-cyan-400" />,
                            title: "Decay Ranking Engine",
                            desc: "Applies dynamic time decay formulas so stale user context naturally drops out of top-K consideration without manual deletions."
                        },
                        {
                            icon: <Server color='#50a2ff' className="w-5 h-5 text-emerald-400" />,
                            title: "Offline SQLite Fallback",
                            desc: "Runs completely offline without cloud dependencies for local development, tests, and air-gapped environments."
                        }
                    ].map((spec, i) => (
                        <div key={i} className="app-card p-6 space-y-3">
                            <div className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] w-fit">
                                {spec.icon}
                            </div>
                            <h4 className="text-base font-bold text-[var(--text-primary)]">{spec.title}</h4>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{spec.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}