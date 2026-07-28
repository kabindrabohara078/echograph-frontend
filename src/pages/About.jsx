import React from 'react';
import { Database, Cpu, Shield, Sparkles, HeartHandshake, Layers, Terminal, CheckCircle2 } from 'lucide-react';

export default function About(props) {
    const isDark = props.dark;

    const values = [
        {
            icon: <Database className="w-6 h-6 text-cyan-400" />,
            title: "Relational + Vector Native",
            desc: "Built on PostgreSQL and pgvector, avoiding external SaaS vector locks and keeping user data structured, relational, and ACID-compliant."
        },
        {
            icon: <Cpu className="w-6 h-6 text-blue-400" />,
            title: "Adaptive Temporal Decay",
            desc: "Context relevance isn't static. EchoGraph dynamically weights memories by mathematical recency curves and user access frequency."
        },
        {
            icon: <Shield className="w-6 h-6 text-emerald-400" />,
            title: "Privacy & Multi-Tenant Isolation",
            desc: "Every memory vector is strictly bound to user IDs. Independent memory spaces prevent cross-user prompt leakages."
        },
        {
            icon: <Sparkles className="w-6 h-6 text-purple-400" />,
            title: "Token Cost Optimization",
            desc: "Reduces raw LLM prompt inflation by up to 40% through precision top-K retrieval filtering."
        }
    ];

    const techStack = [
        { name: "FastAPI", category: "Backend Microservice", color: "from-emerald-500 to-teal-600" },
        { name: "PostgreSQL", category: "Relational Database", color: "from-blue-500 to-indigo-600" },
        { name: "pgvector", category: "Vector Extension", color: "from-cyan-500 to-blue-600" },
        { name: "Sentence Transformers", category: "Embedding Pipeline", color: "from-purple-500 to-pink-600" },
        { name: "React + Vite", category: "Frontend Interface", color: "from-amber-500 to-orange-600" },
        { name: "JWT + Passlib", category: "Secure Authentication", color: "from-red-500 to-pink-600" }
    ];

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#18181c] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto space-y-20">

                {/* HERO SECTION */}
                <div className="text-center space-y-4 max-w-4xl mx-auto pt-6">
                    <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3.5 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Mission & Architecture
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Stateful Memory for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Intelligent AI</span>
                    </h1>
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        EchoGraph was built to solve the fundamental limitation of modern LLMs: statelessness. We empower AI agents to remember facts, adapt to preferences, and retain long-term contextual continuity.
                    </p>
                </div>

                {/* OUR VALUES & PRINCIPLES */}
                <div className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold">Engineering Philosophy</h2>
                        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Core principles guiding the EchoGraph architecture.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((v, idx) => (
                            <div key={idx} className={`p-6 sm:p-8 rounded-3xl border transition-all hover:scale-[1.01] ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-xl' : 'bg-white border-gray-200 shadow-md'}`}>
                                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-4">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TECH STACK GRID */}
                <div className={`rounded-3xl p-8 sm:p-12 border ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-2xl' : 'bg-white border-gray-200 shadow-lg'}`}>
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Powered by Modern Infra</h2>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Built on enterprise open-source technology for max performance and zero vendor lock-in.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {techStack.map((item, idx) => (
                            <div key={idx} className={`p-5 rounded-2xl border ${isDark ? 'bg-gray-950/80 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white bg-gradient-to-r ${item.color} w-fit mb-2`}>
                                    {item.category}
                                </div>
                                <div className="text-lg font-bold">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* VISION STATEMENT */}
                <div className={`rounded-3xl p-8 sm:p-12 border text-center space-y-6 max-w-4xl mx-auto ${isDark ? 'bg-gradient-to-b from-gray-900 to-black border-cyan-500/30' : 'bg-gradient-to-b from-cyan-500/10 to-blue-500/5 border-cyan-500/20'}`}>
                    <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 rounded-full px-4 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Looking Ahead
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold">Stateful AI is Purposeful AI</h2>
                    <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        We envision a world where AI assistants learn and adapt alongside humans over years, building continuous context graphs without sacrificing privacy or performance.
                    </p>
                </div>

            </div>
        </div>
    );
}