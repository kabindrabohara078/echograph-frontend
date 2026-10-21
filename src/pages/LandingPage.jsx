import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Terminal, 
    Database, 
    Cpu, 
    Zap, 
    Shield, 
    ArrowRight, 
    Copy, 
    Check, 
    Layers, 
    Activity, 
    Code2, 
    Sparkles 
} from 'lucide-react';

const Hero = ({ dark }) => {
    const [copied, setCopied] = useState(false);
    const [activeHeroTab, setActiveHeroTab] = useState('payload');

    const sampleCode = `{
  "context": "User prefers PostgreSQL with pgvector for ACID memory",
  "type": "preference",
  "importance": 0.95,
  "decay_half_life_days": 90
}`;

    const sampleResponse = `{
  "status": "stored",
  "id": "mem_849201",
  "vector_dim": 384,
  "distance": 0.082,
  "final_rank": 1.042,
  "latency": "6.8ms"
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(activeHeroTab === 'payload' ? sampleCode : sampleResponse);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Messaging */}
                <div className="lg:col-span-6 space-y-6">

            <br />
            <br />
            

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[var(--text-primary)]">
                        Persistent Context for{' '}
                        <span className="text-blue-400">
                            Autonomous AI
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] max-w-xl">
                        EchoGraph continuously ingests, organizes, and surfaces user knowledge using vector embeddings and mathematical decay ranking. Never let your LLM forget what matters.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link to="/test" className="btn btn-primary">
                            <span>Open Playground</span>
                        </Link>
                        <Link to="/docs" className="btn btn-secondary">
                            <Code2 className="w-4 h-4 text-[var(--text-secondary)]" />
                            <span>API Documentation</span>
                        </Link>
                        <Link to="/memory" className="btn btn-outline hidden sm:inline-flex">
                            <Activity className="w-4 h-4 text-[var(--text-secondary)]" />
                            <span>Decay Engine</span>
                        </Link>
                    </div>

                    {/* Quick Bullet Checklist */}
                    <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-muted)] font-mono">
                        <span className="flex items-center gap-1.5">pgvector Native
                        </span>
                        <span className="flex items-center gap-1.5">Offline SQLite + Live Neon
                        </span>
                        <span className="flex items-center gap-1.5">Sub-8ms Retrieval
                        </span>
                    </div>
                </div>

                {/* Right Column: Code & Interactive Terminal */}
                <div className="lg:col-span-6">
                    <div className="app-card overflow-hidden shadow-2xl">
                        {/* Terminal Header Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                <span className="ml-2 text-xs font-mono text-[var(--text-muted)]">
                                    POST /api/v1/memory
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setActiveHeroTab('payload')}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                                        activeHeroTab === 'payload'
                                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold border border-[var(--border-color)]'
                                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    Payload
                                </button>
                                <button
                                    onClick={() => setActiveHeroTab('response')}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                                        activeHeroTab === 'response'
                                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold border border-[var(--border-color)]'
                                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    Response
                                </button>
                                <button
                                    onClick={handleCopy}
                                    title="Copy Code"
                                    className="p-1.5 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-1"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-5 font-mono text-xs overflow-x-auto bg-[var(--bg-primary)] leading-relaxed">
                            <pre className="text-[var(--text-secondary)]">
                                {activeHeroTab === 'payload' ? sampleCode : sampleResponse}
                            </pre>
                        </div>

                        {/* Terminal Footer Metrics */}
                        <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded"></span>
                                HNSW Index Match
                            </span>
                            <span>Sentence Transformers 384-d</span>
                            <span className="text-white">200 OK (0.007s)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Stats = () => {
    const metrics = [
        { value: "40%", label: "Context Window Token Savings", detail: "Avoid re-feeding full conversational history" },
        { value: "< 8ms", label: "Vector Search Latency", detail: "HNSW index over normalized 384-d vectors" },
        { value: "100%", label: "ACID Isolation", detail: "PostgreSQL & SQLite row-isolated data protection" },
        { value: "Half-Life", label: "Mathematical Decay Curve", detail: "Automatic temporal relevance weighting" },
    ];
    return (
        <section className="py-12 border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="space-y-1 text-left p-3">
                        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">
                            {m.value}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                            {m.label}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                            {m.detail}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Features = () => {
    const points = [
        {
            title: "Semantic Knowledge Vectors",
            desc: "Converts natural language utterances, decisions, and system facts into 384-dimensional vector embeddings with instant indexing.",
            icon: <Database color='#50a2ff' className="w-5 h-5 text-blue-400" />,
            tag: "Vector Layer"
        },
        {
            title: "Adaptive Recency Ranking",
            desc: "Balances raw cosine similarity with exponential half-life decay and query access counts. Outdated context safely decays away.",
            icon: <Cpu color='#50a2ff' className="w-5 h-5 text-cyan-400" />,
            tag: "Mathematical Decay"
        },
        {
            title: "Granular Node Lifecycle",
            desc: "Full operational lifecycle support: active query states, cold archival storage, and soft-deleted records for audit safety.",
            icon: <Layers color="#50a2ff" className="w-5 h-5 text-indigo-400" />,
            tag: "Node States"
        },
        {
            title: "Agentic Middleware Design",
            desc: "Drop-in REST endpoints for LangChain, AutoGen, LlamaIndex, or custom autonomous agent scripts with strict multi-tenancy.",
            icon: <Shield color='#50a2ff' className="w-5 h-5 text-emerald-400" />,
            tag: "Zero Lock-In"
        },
    ];

    return (
        <section id="features" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <h2 className="text-3xl font-bold sm:text-4xl text-[var(--text-primary)]">
                    Engineered for Stateful Intelligence
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                    Why build complicated custom embedding sync jobs? EchoGraph provides the entire long-term cognitive fabric out of the box.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {points.map((p, i) => (
                    <div key={i} className="app-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] border border-blue-400">
                                    {p.icon}
                                </div>
                            </div>
                            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                                {p.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                {p.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            num: "01",
            title: "Ingest Context",
            desc: "Send raw conversation text, user instructions, or system milestones via the REST API endpoint."
        },
        {
            num: "02",
            title: "Embed & Index",
            desc: "Fast sentence-transformers generate high-resolution embeddings stored natively in PostgreSQL pgvector or offline SQLite."
        },
        {
            num: "03",
            title: "Surface with Decay",
            desc: "Adaptive ranking multiplies semantic similarity with recency decay so your AI agent receives only crisp, relevant context."
        },
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <h2 className="text-3xl font-bold sm:text-4xl text-[var(--text-primary)]">
                    Three Steps to Infinite Context
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                    A clean, transparent pipeline designed to eliminate LLM forgetfulness entirely.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                    <div key={i} className="app-card p-6 sm:p-8 relative space-y-4">
                        <div className="text-3xl font-black font-mono text-blue-400 select-none">
                            {s.num}
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">
                            {s.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CTASection = () => {
    return (
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="app-card p-8 sm:p-12 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
                <div className="max-w-xl mx-auto space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                        Experience Stateful AI in Action
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        Test memory ingestion, vector search, and ranking decay live in the developer sandbox.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link to="/test" className="btn btn-primary">
                        Launch Interactive Playground
                    </Link>
                    <Link to="/products" className="btn btn-secondary">
                        View Product Capabilities
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="border-t border-[var(--border-color)] py-16 px-4 sm:px-6 bg-[var(--bg-primary)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-black tracking-wider text-blue-400">
                            ECHOGRAPH
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm max-w-sm leading-relaxed text-[var(--text-secondary)]">
                        Architecting the foundational long-term memory fabric for autonomous machines and stateful application layers.
                    </p>
                    <div className="text-xs italic text-[var(--text-muted)]">
                        "Because stateful AI is purposeful AI."
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-[var(--text-primary)] font-mono">
                        Product
                    </h4>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                        <li><Link to="/test" className="hover:text-[var(--text-primary)] transition-colors">Playground</Link></li>
                        <li><Link to="/memory" className="hover:text-[var(--text-primary)] transition-colors">Decay Architecture</Link></li>
                        <li><Link to="/products" className="hover:text-[var(--text-primary)] transition-colors">Engine Specs</Link></li>
                        <li><Link to="/docs" className="hover:text-[var(--text-primary)] transition-colors">API Reference</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-[var(--text-primary)] font-mono">
                        Company
                    </h4>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                        <li><Link to="/about" className="hover:text-[var(--text-primary)] transition-colors">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-[var(--text-primary)] transition-colors">Careers</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-[var(--text-primary)] font-mono">
                        Ecosystem
                    </h4>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                        <li>
                            <a 
                                href="https://github.com/kabindrabohara078/echograph-frontend" 
                                target="_blank" 
                                rel="noreferrer"
                                className="hover:text-[var(--text-primary)] transition-colors"
                            >
                                GitHub Repo
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-[var(--border-color)] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)]">
                <p>© {new Date().getFullYear()} EchoGraph Inc. Built for Autonomous Intelligence.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                    <span className="font-mono text-[11px]">PostgreSQL • pgvector • FastAPI</span>
                </div>
            </div>
        </footer>
    );
};

export default function LandingPage(props) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Hero dark={props.dark} />
            <Stats />
            <Features />
            <HowItWorks />
            <CTASection />
            <Footer />
        </div>
    );
}