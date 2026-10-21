import React from 'react';
import { Database, Cpu, Shield, Sparkles, Layers, Terminal, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About(props) {
    const values = [
        {
            icon: <Database color='#50a2ff' className="w-5 h-5 text-blue-400" />,
            title: "Relational + Vector Native",
            desc: "Built on PostgreSQL and pgvector, avoiding external SaaS vector locks and keeping user data structured, relational, and ACID-compliant."
        },
        {
            icon: <Cpu color='#50a2ff' className="w-5 h-5 text-cyan-400" />,
            title: "Adaptive Temporal Decay",
            desc: "Context relevance isn't static. EchoGraph dynamically weights memories by mathematical recency curves and user access frequency."
        },
        {
            icon: <Shield color='#50a2ff' className="w-5 h-5 text-emerald-400" />,
            title: "Privacy & Multi-Tenant Isolation",
            desc: "Every memory vector is strictly bound to user IDs. Independent memory spaces prevent cross-user prompt leakages."
        },
        {
            icon: <Terminal color='#50a2ff' className="w-5 h-5 text-purple-400" />,
            title: "Token Cost Optimization",
            desc: "Reduces raw LLM prompt inflation by up to 40% through precision top-K retrieval filtering."
        }
    ];

    const techStack = [
        { name: "FastAPI", category: "Microservice", detail: "Asynchronous REST engine" },
        { name: "PostgreSQL", category: "Database", detail: "ACID relational storage" },
        { name: "pgvector", category: "Extension", detail: "HNSW high-speed indexing" },
        { name: "Sentence Transformers", category: "Embeddings", detail: "384-dimensional vectors" },
        { name: "React + Vite", category: "Frontend", detail: "Developer-first interface" },
        { name: "JWT + Argon2/Bcrypt", category: "Security", detail: "Multi-tenant auth isolation" }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <br />
            <br />
            {/* HERO SECTION */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Stateful Memory for{' '}
                    <span className="text-blue-400">
                        Intelligent AI
                    </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                    EchoGraph was built to solve the fundamental limitation of modern LLMs: statelessness. We empower AI agents to remember facts, adapt to preferences, and retain long-term contextual continuity.
                </p>
            </div>

            {/* OUR VALUES & PRINCIPLES */}
            <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Engineering Philosophy</h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        Foundational architecture principles guiding the EchoGraph memory engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((v, idx) => (
                        <div key={idx} className="app-card p-6 sm:p-8 space-y-4">
                            <div className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] w-fit">
                                {v.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">{v.title}</h3>
                            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* TECH STACK GRID */}
            <div className="app-card p-8 sm:p-12 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Powered by Modern Infra</h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        Engineered with battle-tested open-source components for maximum speed and zero vendor lock-in.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {techStack.map((item, idx) => (
                        <div key={idx} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] space-y-2">
                            <div className="badge-mono text-blue-400 border-blue-500/30">
                                {item.category}
                            </div>
                            <div className="text-base sm:text-lg font-bold text-[var(--text-primary)]">{item.name}</div>
                            <div className="text-xs text-[var(--text-muted)]">{item.detail}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* VISION STATEMENT */}
            <div className="app-card p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                    "Stateful AI is Purposeful AI"
                </h2>
                <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-[var(--text-secondary)]">
                    We envision a world where AI assistants learn and adapt alongside humans over years, building continuous context graphs without sacrificing privacy, control, or latency.
                </p>
                <div className="pt-2">
                    <Link to="/test" className="btn btn-primary">
                        <span>Experience the Playground</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}