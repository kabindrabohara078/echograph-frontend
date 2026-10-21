import React, { useState } from 'react';
import { 
    Terminal, 
    Code, 
    BookOpen, 
    Key, 
    Layers, 
    Search, 
    Check, 
    Copy, 
    Sparkles, 
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { API_URL } from '../config/api';

export default function Docs(props) {
    const [activeTab, setActiveTab] = useState('getting-started');
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <br />
            <br />
            {/* HERO HEADER */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Developer{' '}
                    <span className="text-blue-400">
                        Documentation
                    </span>
                </h1>
                <p className="text-base sm:text-lg text-[var(--text-secondary)]">
                    Integrate stateful RAG long-term memory into your AI agents in under 5 minutes with our minimal RESTful FastAPI endpoints.
                </p>
            </div>

            {/* DOCS NAVIGATION & CONTENT LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* SIDEBAR NAVIGATION */}
                <div className="lg:col-span-3 app-card p-3 sticky top-24 space-y-1">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3 py-2">
                        Contents
                    </div>
                    <nav className="space-y-1">
                        {[
                            { id: 'getting-started', label: 'Getting Started'},
                            { id: 'auth', label: 'Authentication'},
                            { id: 'ingest', label: 'Ingest Memory'},
                            { id: 'search', label: 'Vector Search'},
                            { id: 'sdks', label: 'Code Examples'}
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                                    activeTab === item.id
                                        ? 'bg-[var(--accent-primary)] text-[var(--btn-text)] shadow-sm'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* MAIN DOCS CONTENT */}
                <div className="lg:col-span-9 app-card p-6 sm:p-10 space-y-8">

                    {/* SECTION: GETTING STARTED */}
                    {activeTab === 'getting-started' && (
                        <div className="space-y-6">
                            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
                                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Getting Started</h2>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                    Base API endpoint configuration and quick integration workflow.
                                </p>
                            </div>

                            {/* Base URL Pill */}
                            <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--text-muted)]">Base URL:</span>
                                    <span className="text-blue-400 font-bold">{API_URL}</span>
                                </div>
                                <button 
                                    onClick={() => copyToClipboard(API_URL, 'base_url')}
                                    className="p-1.5 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
                                >
                                    {copied === 'base_url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span className="text-[11px]">{copied === 'base_url' ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                                <h3 className="text-base font-bold text-[var(--text-primary)]">Quick Integration Workflow</h3>
                                <ol className="list-decimal list-inside space-y-3">
                                    <li>
                                        <strong className="text-[var(--text-primary)]">Authenticate:</strong> Sign up or Log in via <code className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] font-mono border border-[var(--border-color)]">login</code> to acquire a Bearer JWT Token.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--text-primary)]">Ingest Knowledge:</strong> Post user facts, preferences, or conversation items to <code className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] font-mono border border-[var(--border-color)]">memory</code>.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--text-primary)]">Retrieve Context:</strong> Query <code className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] font-mono border border-[var(--border-color)]">search</code> to receive top ranked contextual vector embeddings.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    )}

                    {/* SECTION: AUTHENTICATION */}
                    {activeTab === 'auth' && (
                        <div className="space-y-6">
                            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
                                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Authentication (JWT Bearer Token)</h2>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                    All memory ingestion and vector retrieval endpoints require an Authorization header.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[var(--text-primary)]">HTTP Request Header</h3>
                                <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                                    Authorization: Bearer YOUR_JWT_ACCESS_TOKEN
                                </div>

                                <h3 className="text-sm font-bold text-[var(--text-primary)] mt-4">Login Endpoint</h3>
                                <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] space-y-2">
                                    <div className="text-blue-400 font-bold">login</div>
                                    <pre>{`{
  "email": "user@example.com",
  "password": "your_secure_password"
}`}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION: INGEST MEMORY */}
                    {activeTab === 'ingest' && (
                        <div className="space-y-6">
                            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">memory (Ingest Node)</h2>
                                </div>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                    Embeds text context using sentence-transformers and stores into vector storage with importance and retention metadata.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[var(--text-primary)]">Request Body Parameters</h3>
                                <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
                                    <table className="w-full text-xs text-left">
                                        <thead className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-mono">
                                            <tr>
                                                <th className="p-3">Field</th>
                                                <th className="p-3">Type</th>
                                                <th className="p-3">Required</th>
                                                <th className="p-3">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                                            <tr>
                                                <td className="p-3 font-mono text-blue-400">context</td>
                                                <td className="p-3 font-mono">string</td>
                                                <td className="p-3 text-blue-400 font-semibold">Yes</td>
                                                <td className="p-3">Raw natural text context, statement, or preference to vectorize.</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-mono text-blue-400">type</td>
                                                <td className="p-3 font-mono">string</td>
                                                <td className="p-3 text-blue-400 font-semibold">Yes</td>
                                                <td className="p-3">Category enum: <code>fact</code>, <code>preference</code>, <code>decision</code>, <code>goal</code>, <code>event</code>.</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-mono text-blue-400">importance</td>
                                                <td className="p-3 font-mono">float</td>
                                                <td className="p-3 text-[var(--text-muted)]">No (0.8 default)</td>
                                                <td className="p-3">Importance weight multiplier (0.1 to 1.0).</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h3 className="text-sm font-bold text-[var(--text-primary)] mt-4">Sample JSON Body</h3>
                                <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                                    <pre>{`{
  "context": "User prefers concise python solutions using dataclasses",
  "type": "preference",
  "importance": 0.95
}`}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION: VECTOR SEARCH */}
                    {activeTab === 'search' && (
                        <div className="space-y-6">
                            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">search (Vector Retrieval)</h2>
                                </div>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                    Executes semantic cosine similarity lookups against user memory space and applies temporal decay ranking.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[var(--text-primary)]">Query Request Body</h3>
                                <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                                    <pre>{`{
  "query": "What python conventions does the user prefer?",
  "type": "preference"
}`}</pre>
                                </div>

                                <h3 className="text-sm font-bold text-[var(--text-primary)] mt-4">Response Object</h3>
                                <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                                    <pre>{`{
  "results": [
    {
      "id": 142,
      "content": "User prefers concise python solutions using dataclasses",
      "type": "preference",
      "importance": 0.95,
      "distance": 0.124,
      "final_rank": 1.082
    }
  ]
}`}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION: SDKS */}
                    {activeTab === 'sdks' && (
                        <div className="space-y-6">
                            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
                                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Code Integration Snippets</h2>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                    Ready-to-use Python and Node.js implementation templates.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[var(--text-primary)]">Python Requests Example</h3>
                                <div className="p-4 rounded-xl font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] overflow-x-auto leading-relaxed">
                                    <pre>{`import requests

API_URL = "http://localhost:8000"
headers = {"Authorization": f"Bearer {user_jwt_token}"}

# Search User Memory
response = requests.post(
    f"{API_URL}/search",
    headers=headers,
    json={"query": "UI theme preferences"}
)
results = response.json().get("results", [])
print("Retrieved context:", results)`}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}