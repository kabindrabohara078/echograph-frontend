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
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#18181c] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* HERO */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
                    <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3.5 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Join the Team
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Build the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Stateful AI</span>
                    </h1>
                    <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We are building the foundational long-term memory fabric for autonomous agents. Join us in making AI contextually aware.
                    </p>
                </div>

                {/* OPEN POSITIONS */}
                <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold">Open Roles</h2>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current opportunities to shape the EchoGraph platform.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {openings.map((job, idx) => (
                            <div key={idx} className={`p-6 sm:p-8 rounded-3xl border transition-all hover:border-cyan-500/50 ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-md'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                            {job.team}
                                        </span>
                                        <h3 className="text-xl font-bold mt-2">{job.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                                        <span className="px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700">{job.location}</span>
                                        <span className="px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700">{job.type}</span>
                                    </div>
                                </div>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{job.desc}</p>
                                <button className="mt-6 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity">
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