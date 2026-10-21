import React, { useState } from 'react';
import { Briefcase, Zap, Rocket, Check, ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers(props) {
    const [appliedRole, setAppliedRole] = useState(null);

    const openings = [
        {
            title: "Senior AI Systems Engineer",
            team: "Core Infrastructure",
            location: "Remote",
            type: "Full-Time",
            desc: "Optimize pgvector HNSW indexing paths, FastAPI query execution engine, and sub-8ms retrieval pipelines for million-node clusters."
        },
        {
            title: "Full-Stack Engineer (React + Python)",
            team: "Product & Dashboard",
            location: "Remote",
            type: "Full-Time",
            desc: "Build intuitive developer tools, memory visualizer graphs, interactive decay simulators, and real-time RAG playground experiences."
        },
        {
            title: "DevRel & Community Lead",
            team: "Developer Experience",
            location: "Remote",
            type: "Full-Time",
            desc: "Engage with autonomous AI agent builders, author technical tutorials, and drive adoption across open-source communities."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">

            {/* HERO */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Build the Future of{' '}
                    <span className="text-blue-400">
                        Stateful AI
                    </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                    We are building the foundational long-term memory fabric for autonomous agents. Join us in making artificial intelligence truly contextually aware.
                </p>
            </div>

            {/* OPEN POSITIONS */}
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="text-center max-w-xl mx-auto space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Open Positions</h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        Current high-impact roles to shape the EchoGraph memory platform.
                    </p>
                </div>

                <div className="space-y-4">
                    {openings.map((job, idx) => (
                        <div key={idx} className="app-card p-6 sm:p-8 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1.5">{job.title}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {job.location}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {job.type}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">{job.desc}</p>

                            <div className="pt-2 flex items-center justify-between">
                                {appliedRole === job.title ? (
                                    <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5 font-semibold">
                                        <Check className="w-4 h-4" /> Application Received! We'll review shortly.
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => setAppliedRole(job.title)}
                                        className="btn btn-secondary text-xs"
                                    >
                                        <span>Apply for Role</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}