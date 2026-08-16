import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = (props) => {
    return (
        <section className="pt-25 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            <div className="space-y-6">
                <div className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${props.dark ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-blue-600 text-blue-600 bg-blue-50'}`}>
                    Now in MVP v1.0
                </div>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold ${props.dark ? 'text-slate-100' : 'text-slate-900'} leading-tight`}>
                    The Long-Term Memory Layer For <span className={`${props.dark ? 'text-blue-400' : 'text-blue-600'}`}>AI Agents</span>
                </h1>
                <p className={`text-lg max-w-xl ${props.dark ? 'text-slate-400' : 'text-slate-600'}`}>
                    EchoGraph persists, reorganizes, and natively surfaces user knowledge using vector embeddings and adaptive ranking. Stop letting your LLMs forget what matters.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="email"
                        placeholder="Enter your email to get API access"
                        className={`${props.dark ? "bg-slate-900 text-white border-slate-700" : "bg-white text-slate-900 border-slate-300"} border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow`}
                    />
                    <button className={`${props.dark ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'} px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap border border-transparent`}>
                        Initialize Cluster
                    </button>
                </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
                <div className={`w-full max-w-md ${props.dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl p-6 relative overflow-hidden font-mono text-xs shadow-sm`}>
                    <div className={`flex items-center space-x-2 border-b pb-4 mb-4 ${props.dark ? 'border-slate-800' : 'border-slate-100'}`}>
                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                        <span className={`ml-2 ${props.dark ? 'text-slate-500' : 'text-slate-400'}`}>echograph_pipeline.py</span>
                    </div>
                    <p className={`${props.dark ? 'text-blue-400' : 'text-blue-600'}`}># Ingesting semantic chunk...</p>
                    <p className={`${props.dark ? 'text-slate-300' : 'text-slate-700'}`}>POST /api/v1/memory</p>
                    <pre className={`mt-2 ${props.dark ? 'text-slate-400' : 'text-slate-600'}`}>
{`{
  "content": "Prefers raw SQL over ORMs",
  "type": "preference",
  "importance": 0.85
}`}
                    </pre>
                    <div className={`mt-4 pt-4 border-t ${props.dark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'}`}>
                        <p>✓ Vector Embedding Created [sentence-transformers]</p>
                        <p>✓ pgvector upsert completed (0.004s)</p>
                        <p>✓ Adaptive Recency Weight Updated</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const LogoTicker = (props) => {
    const dummyCompanies = ["OmniAI", "VertexLabs", "Synapse", "QuantumSoft", "NeuralFlow", "DataArc"];
    return (
        <section className={`border-y ${props.dark ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-slate-50"} py-10 overflow-hidden relative`}>
            <div className="flex whitespace-nowrap animate-marquee">
                <div className="flex space-x-16 font-bold tracking-wider text-xl uppercase">
                    {dummyCompanies.concat(dummyCompanies).map((company, index) => (
                        <span key={index} className={`${props.dark ? "text-slate-500" : "text-slate-400"} mx-4 transition-colors`}>
                            {company}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Features = (props) => {
    const points = [
        { title: "Semantic Knowledge Storage", desc: "Maps text chunks directly to multi-dimensional vector structures using pgvector.", icon: "🧠" },
        { title: "Adaptive Decay Ranking", desc: "Balances importance scoring, recency decay, and access frequency automatically.", icon: "📉" },
        { title: "Granular Memory States", desc: "Supports operational workflows via seamless active, archived, and soft-deleted states.", icon: "📁" },
        { title: "Agentic Customization", desc: "Designed explicitly as a plug-and-play middleware layer for autonomous agents.", icon: "🤖" },
    ];
    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className={`text-3xl font-bold sm:text-4xl ${props.dark ? "text-slate-100" : "text-slate-900"}`}>Engineered for Persistent Context</h2>
                <p className={`${props.dark ? "text-slate-400" : "text-slate-600"} mt-4`}>Why struggle building complex custom vector syncing routines? EchoGraph manages the entire cognitive layer seamlessly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {points.map((p, i) => (
                    <div key={i} className={`${props.dark ? "bg-slate-900 border-slate-800 hover:border-blue-500" : "bg-white border-slate-200 hover:border-blue-600"} border p-6 rounded-xl transition-colors group`}>
                        <div className="text-3xl mb-4 w-full h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">{p.icon}</div>
                        <h3 className={`text-lg font-semibold mb-2 ${props.dark ? "text-slate-100" : "text-slate-900"}`}>{p.title}</h3>
                        <p className={`${props.dark ? "text-slate-400" : "text-slate-600"} text-sm leading-relaxed`}>{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Stats = (props) => {
    const metrics = [
        { value: "40%", label: "Token Reductions via Precision Retrieval" },
        { value: "1.2B+", label: "Memories Vectorized" },
        { value: "< 12ms", label: "Average Query Latency" },
        { value: "99.99%", label: "Uptime on FastAPI/Postgres Stack" },
    ];
    return (
        <section className={`py-16 border-y ${props.dark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {metrics.map((m, i) => (
                    <div key={i} className="space-y-2">
                        <div className={`text-3xl sm:text-4xl font-extrabold ${props.dark ? 'text-blue-400' : 'text-blue-600'}`}>{m.value}</div>
                        <div className={`${props.dark ? 'text-slate-400' : 'text-slate-600'} text-xs sm:text-sm font-medium px-4`}>{m.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const HowItWorks = (props) => {
    const steps = [
        { num: "01", title: "Ingest", desc: "Send raw conversation text or application data via our minimalist REST API route." },
        { num: "02", title: "Embed & Store", desc: "Sentence transformers create embeddings; pgvector saves the metadata layout securely." },
        { num: "03", title: "Query & Surface", desc: "Adaptive mathematical scoring automatically weights context based on usage profiles." },
    ];
    return (
        <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className={`text-3xl font-bold ${props.dark ? "text-slate-100" : "text-slate-900"} sm:text-4xl`}>Three Steps to Infinite Memory</h2>
                <p className={`${props.dark ? 'text-slate-400' : 'text-slate-600'} mt-4 `}>A simple modular architecture designed to eliminate LLM forgetfulness entirely.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {steps.map((s, i) => (
                    <div key={i} className={`relative space-y-4 p-6 border rounded-xl ${props.dark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                        <div className={`text-4xl font-black ${props.dark ? "text-slate-800" : "text-slate-200"} select-none font-mono`}>{s.num}</div>
                        <h3 className={`text-xl font-bold ${props.dark ? "text-slate-100" : "text-slate-900"}`}>{s.title}</h3>
                        <p className={`${props.dark ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed`}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Footer = (props) => {
    return (
        <footer className={`border-t py-16 px-6 ${props.dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className={`text-xl font-bold tracking-tight ${props.dark ? 'text-slate-100' : 'text-slate-900'}`}>EchoGraph</span>
                    </div>
                    <p className={`text-sm max-w-sm leading-relaxed ${props.dark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Architecting the foundational long-term memory fabric for autonomous machines and contextual application layers.
                    </p>
                    <div className={`text-xs italic ${props.dark ? 'text-slate-500' : 'text-slate-400'}`}>"Because stateful AI is purposeful AI."</div>
                </div>

                <div>
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${props.dark ? 'text-slate-100' : 'text-slate-900'}`}>Product</h4>
                    <ul className={`space-y-2 text-sm ${props.dark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>API Reference</a></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>pgvector Engine</a></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>Changelog</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${props.dark ? 'text-slate-100' : 'text-slate-900'}`}>Company</h4>
                    <ul className={`space-y-2 text-sm ${props.dark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>About Us</a></li>
                        <li><Link to='/careers' className={`hover:text-blue-500 transition-colors`}>Careers</Link></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>Vision Blueprint</a></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>Brand Assets</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${props.dark ? 'text-slate-100' : 'text-slate-900'}`}>Connect</h4>
                    <ul className={`space-y-2 text-sm ${props.dark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <li><a href="https://github.com/kabindrabohara078/echograph-frontend" target="_blank" className={`hover:text-blue-500 transition-colors`}>GitHub Repository</a></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>Discord Community</a></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>X / Twitter</a></li>
                        <li><a href="#" className={`hover:text-blue-500 transition-colors`}>System Status</a></li>
                    </ul>
                </div>
            </div>

            <div className={`max-w-7xl mx-auto border-t pt-8 flex flex-col sm:flex-row items-center justify-between text-xs ${props.dark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
                <p>© {new Date().getFullYear()} EchoGraph Inc. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                    <a href="#" className={`hover:text-blue-500 transition-colors`}>Privacy Policy</a>
                    <a href="#" className={`hover:text-blue-500 transition-colors`}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default function LandingPage(props) {
    return (
        <div className={`${props.dark ? 'bg-[#111111] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'} min-h-screen font-sans`}>
            <Hero dark={props.dark} />
            <LogoTicker dark={props.dark} />
            <Features dark={props.dark} />
            <Stats dark={props.dark} />
            <HowItWorks dark={props.dark} />
            <Footer dark={props.dark} />
        </div>
    );
}