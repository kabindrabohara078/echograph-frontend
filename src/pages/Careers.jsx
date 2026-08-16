import React from 'react';
import { Briefcase, Zap, Rocket, Code2, Globe } from 'lucide-react';

export default function Careers(props) {
    const isDark = props.dark;

    const openings = [
        {
            title: "Senior AI Systems Engineer",
            team: "Core Infrastructure",
            location: "Remote / Hybrid",
            type: "Full-Time",
            desc: "Help optimize our pgvector HNSW indexing paths, FastAPI query execution engine, and sub-10ms retrieval pipelines."
        },
        {
            title: "Full-Stack Engineer (React + Python)",
            team: "Product & Dashboard",
            location: "Remote",
            type: "Full-Time",
            desc: "Build intuitive developer tools, memory visualizer graphs, and real-time RAG playground experiences."
        },
        {
            title: "DevRel & Community Lead",
            team: "Developer Experience",
            location: "Remote",
            type: "Full-Time",
            desc: "Engage with AI agent builders, author technical tutorials, and drive adoption across open-source communities."
        }
    ];

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#111111] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* HERO */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
                    <div className={`inline-flex items-center space-x-2 border rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${isDark ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-blue-600 text-blue-600 bg-blue-50'}`}>
                        Join the Team
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Build the Future of <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>Stateful AI</span>
                    </h1>
                    <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        We are building the foundational long-term memory fabric for autonomous agents. Join us in making AI contextually aware.
                    </p>
                </div>

                {/* OPEN POSITIONS */}
                <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold">Open Roles</h2>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Current opportunities to shape the EchoGraph platform.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {openings.map((job, idx) => (
                            <div key={idx} className={`p-6 sm:p-8 rounded-3xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-500 shadow-sm'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${isDark ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-slate-100 text-blue-600 border-slate-200'}`}>
                                            {job.team}
                                        </span>
                                        <h3 className="text-xl font-bold mt-2">{job.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                        <span className={`px-3 py-1 rounded-full border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>{job.location}</span>
                                        <span className={`px-3 py-1 rounded-full border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>{job.type}</span>
                                    </div>
                                </div>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{job.desc}</p>
                                <button className={`mt-6 cursor-pointer text-xs font-bold px-5 py-2.5 rounded-xl transition-all border ${isDark ? 'bg-slate-100 text-slate-900 border-slate-100 hover:bg-white' : 'bg-slate-900 text-white border-slate-900 hover:bg-black'}`}>
                                    Apply for Role →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}