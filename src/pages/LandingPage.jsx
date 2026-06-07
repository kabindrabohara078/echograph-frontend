import React, { useState } from 'react';
import { Link } from 'react-router-dom';



// ==========================================
// 2. HERO BANNER
// ==========================================
const Hero = (props) => {
    return (
        <section className="pt-25 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Now in MVP v1.0
                </div>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-${props.dark ? 'white' : 'black'} leading-tight`}>
                    The Long-Term Memory Layer For <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">AI Agents</span>
                </h1>
                <p className={` text-lg max-w-xl ${props.dark ? 'text-white' : 'text-black'}`}>
                    EchoGraph persists, reorganizes, and natively surfaces user knowledge using vector embeddings and adaptive ranking. Stop letting your LLMs forget what matters.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="email"
                        placeholder="Enter your email to get API access"
                        className={`${props.dark? "bg-[#222] text-white": "bg-white text-black"} border border-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 flex-grow`}
                    />
                    <button className="border border-cyan-500/100 bg-white text-cyan-500 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors whitespace-nowrap">
                        Initialize Cluster
                    </button>
                </div>
            </div>

            {/* Elegant, Non-Graphic Intense Abstract Design */}
            <div className="relative flex items-center justify-center lg:justify-end">
                <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-3xl -z-10 delay-700"></div>

                <div className={`w-full max-w-md ${props.dark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-white'} border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden font-mono text-xs text-gray-400`}>
                    <div className="flex items-center space-x-2 border-b border-gray-800 pb-4 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        <span className="text-[10px] text-gray-500 ml-2">echograph_pipeline.py</span>
                    </div>
                    <p className="text-cyan-400"># Ingesting semantic chunk...</p>
                    <p className="text-purple-800">POST <span className={`${props.dark ? 'text-white' : 'text-black'}`}>/api/v1/memory</span></p>
                    <pre className={`mt-2 ${props.dark ? 'text-white' : 'text-black'}`}>
                        {`{
  "content": "Prefers raw SQL over ORMs",
  "type": "preference",
  "importance": 0.85
}`}
                    </pre>
                    <div className={`mt-4 pt-4 border-t border-gray-800 ${props.dark ? 'text-white' : 'text-black'}`}>
                        <p>✓ Vector Embedding Created [sentence-transformers]</p>
                        <p>✓ pgvector upsert completed (0.004s)</p>
                        <p>✓ Adaptive Recency Weight Updated</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// 3. LOGO TICKER (TRANSITION RIGHT TO LEFT)
// ==========================================
const LogoTicker = (props) => {
    const dummyCompanies = ["OmniAI", "VertexLabs", "Synapse", "QuantumSoft", "NeuralFlow", "DataArc"];

    return (
        <section className={`border-y border-gray-900 ${props.dark? "bg-[#222]" : "bg-white"} py-10 overflow-hidden relative`}>
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[gray] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[gray] to-transparent z-10"></div>

            {/* Infinite Scroll Wrapper */}
            <div className="flex whitespace-nowrap animate-marquee">
                <div className="flex space-x-16 text-gray-500 font-bold tracking-wider text-xl uppercase">
                    {dummyCompanies.concat(dummyCompanies).map((company, index) => (
                        <span key={index} className={`${props.dark? "text-white":"text-black"} mx-4 transition-colors`}>
                            ⚡ {company}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==========================================
// 4. WHY CHOOSE US (FEATURES)
// ==========================================
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
                <h2 className={`text-3xl font-bold  sm:text-4xl ${props.dark? "text-white":"text-black"}`}>Engineered for Persistent Context</h2>
                <p className={`${props.dark? "text-gray-400" :"text-black"} mt-4`}>Why struggle building complex custom vector syncing routines? EchoGraph manages the entire cognitive layer seamlessly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {points.map((p, i) => (
                    <div key={i} className={`${props.dark? "bg-gray-700/40" : "bg-gray-300/40"} border border-gray-800 p-6 rounded-xl hover:border-cyan-600/50 transition-colors group`}>
                        <div className="text-3xl mb-4  w-full h-12 flex items-center justify-center rounded-lg group-hover:scale-130 transition-transform">{p.icon}</div>
                        <h3 className={`text-lg font-semibold mb-2 ${props.dark ? "text-white" : "text-black"}`}>{p.title}</h3>
                        <p className={`${props.dark? "text-gray-400" :"text-black"} text-sm leading-relaxed`}>{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ==========================================
// 5. STATS CONTAINER
// ==========================================
const Stats = (props) => {
    const metrics = [
        { value: "40%", label: "Token Reductions via Precision Retrieval" },
        { value: "1.2B+", label: "Memories Vectorized" },
        { value: "< 12ms", label: "Average Query Latency" },
        { value: "99.99%", label: "Uptime on FastAPI/Postgres Stack" },
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-cyan-950/20 via-blue-950/10 to-transparent border-y border-gray-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {metrics.map((m, i) => (
                    <div key={i} className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{m.value}</div>
                        <div className={`${props.dark? 'text-gray-200':'text-gray-700'} text-xs sm:text-sm font-medium px-4`}>{m.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ==========================================
// 6. HOW IT WORKS (BASIC OVERVIEW)
// ==========================================
const HowItWorks = (props) => {
    const steps = [
        { num: "01", title: "Ingest", desc: "Send raw conversation text or application data via our minimalist REST API route." },
        { num: "02", title: "Embed & Store", desc: "Sentence transformers create embeddings; pgvector saves the metadata layout securely." },
        { num: "03", title: "Query & Surface", desc: "Adaptive mathematical scoring automatically weights context based on usage profiles." },
    ];

    return (
        <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className={`text-3xl font-bold ${props.dark?"text-white":"text-black"} sm:text-4xl`}>Three Steps to infinite Memory</h2>
                <p className={`${props.dark? 'text-gray-200':'text-gray-700'} mt-4 `}>A simple modular architecture designed to eliminate LLM forgetfulness entirely.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {steps.map((s, i) => (
                    <div key={i} className="relative space-y-4">
                        <div className={`text-6xl font-black ${props.dark? "text-white":"text-dark"} select-none font-mono`}>{s.num}</div>
                        <h3 className={`text-xl font-bold ${props.dark?"text-white":"text-black"}`}>{s.title}</h3>
                        <p className={`${props.dark? 'text-gray-200':'text-gray-700'} text-sm leading-relaxed`}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ==========================================
// 7. PRICING CONTAINER
// ==========================================
// const Pricing = (props) => {
//     return (
//         <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto">
//             <div className="text-center max-w-2xl mx-auto mb-16">
//                 <h2 className={`text-3xl font-bold ${props.dark?"text-white":"text-black"} sm:text-4xl`}>Predictable Dev-Friendly Pricing</h2>
//                 <p className="text-gray-400 mt-4">Scale your active agents seamlessly from MVP experiments to production tiers.</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Free Plan */}
//                 <div className="bg-gray-400/30 border border-gray-800 rounded-2xl p-8 flex flex-col justify-between">
//                     <div>
//                         <h3 className={`text-xl font-bold ${props.dark?"text-white":"text-black"}`}>Developer Sandbox</h3>
//                         <p className="text-gray-400 text-sm mt-2">Perfect for side projects and local pipeline testing.</p>
//                         <div className="my-6 flex items-baseline">
//                             <span className={`text-4xl font-extrabold ${props.dark?"text-white":"text-black"}`}>$0</span>
//                             <span className="text-gray-500 ml-2 text-sm">/ forever</span>
//                         </div>
//                         <ul className={`pace-y-3 text-sm ${props.dark?"text-white":"text-black"} border-t border-gray-800 pt-6`}>
//                             <li>• Up to 10,000 Active Memory nodes</li>
//                             <li>• Standard Sentence-Transformer models</li>
//                             <li>• Flat Retrieval Ranking</li>
//                             <li>• Community Support</li>
//                         </ul>
//                     </div>
//                     <button className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors">Start Local Node</button>
//                 </div>

//                 {/* Pro Plan */}
//                 <div className="bg-gray-950 border-2 border-cyan-500 rounded-2xl p-8 flex flex-col justify-between relative shadow-xl shadow-cyan-950/20">
//                     <div className="absolute top-0 right-6 -translate-y-1/2 bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</div>
//                     <div>
//                         <h3 className="text-xl font-bold text-white">Production Agent</h3>
//                         <p className="text-gray-400 text-sm mt-2">For live apps requiring high-throughput adaptive ranking.</p>
//                         <div className="my-6 flex items-baseline">
//                             <span className="text-4xl font-extrabold text-white">$49</span>
//                             <span className="text-gray-500 ml-2 text-sm">/ month</span>
//                         </div>
//                         <ul className="space-y-3 text-sm text-gray-300 border-t border-gray-800 pt-6">
//                             <li>• Unlimited Managed Vector Storage</li>
//                             <li>• Adaptive Decay & Frequency Sorting</li>
//                             <li>• Automatic Archival & Deduplication Pipeline</li>
//                             <li>• Priority API Response Tiers (&lt;15ms)</li>
//                         </ul>
//                     </div>
//                     <button className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">Deploy Production Node</button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// ==========================================
// 8. FOOTER
// ==========================================
const Footer = () => {
    return (
        <footer className="border-t border-gray-900 bg-[#222]/60 pt-16 pb-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white tracking-tight">EchoGraph</span>
                    </div>
                    <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
                        Architecting the foundational long-term memory fabric for autonomous machines and contextual application layers.
                    </p>
                    <div className="text-xs text-gray-200 italic">"Because stateful AI is purposeful AI."</div>
                </div>

                <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">pgvector Engine</a></li>
                        {/* <li><a href="#" className="hover:text-white transition-colors">Pricing Options</a></li> */}
                        <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><Link to='/careers' className="hover:text-white transition-colors">Careers 
                        
                        {/* <span className="text-[10px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded ml-1">Hiring
                            </span> */}
                            </Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">Vision Blueprint</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Brand Assets</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Connect</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="https://github.com/kabindrabohara078/echograph-frontend" target="_blank" className="hover:text-white transition-colors">GitHub Repository</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Discord Community</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">X / Twitter</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-gray-400 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
                <p className='text-gray-300'>© {new Date().getFullYear()} EchoGraph Inc. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                    <a href="#" className="hover:text-gray-300 text-gray-100">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-300 text-gray-100">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

// ==========================================
// MAIN APP EXPORT ENTRYPOINT
// ==========================================
export default function LandingPage(props) {
    return (
        <div className={`${props.dark ? 'bg-[#333]' : 'bg-gray-100'} text-gray-100 min-h-screen font-sans selection:text-cyan-200`}>
            <Hero dark={props.dark} />
            <LogoTicker dark={props.dark} />
            <Features dark={props.dark} />
            <Stats dark={props.dark} />
            <HowItWorks dark={props.dark} />
            {/* <Pricing dark={props.dark} /> */}
            <Footer dark={props.dark} />
        </div>
    );
}