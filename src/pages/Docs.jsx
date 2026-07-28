import React, { useState } from 'react';
import { Terminal, Code, BookOpen, Key, Layers, Search, Check, Copy } from 'lucide-react';

export default function Docs(props) {
    const [activeTab, setActiveTab] = useState('getting-started');
    const [copied, setCopied] = useState('');
    const isDark = props.dark;

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-[#18181c] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto space-y-12">

                {/* HERO HEADER */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        API Reference v1.0
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Developer <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Documentation</span>
                    </h1>
                    <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Integrate stateful RAG long-term memory into your AI agents in under 5 minutes with our RESTful FastAPI endpoints.
                    </p>
                </div>

                {/* DOCS NAVIGATION LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* SIDEBAR NAVIGATION */}
                    <div className={`lg:col-span-3 rounded-2xl p-4 border sticky top-28 ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 py-2">Documentation Nav</div>
                        <nav className="space-y-1">
                            {[
                                { id: 'getting-started', label: '1. Getting Started', icon: <BookOpen className="w-4 h-4" /> },
                                { id: 'auth', label: '2. Authentication', icon: <Key className="w-4 h-4" /> },
                                { id: 'ingest', label: '3. Ingest Memory', icon: <Layers className="w-4 h-4" /> },
                                { id: 'search', label: '4. Vector Search', icon: <Search className="w-4 h-4" /> },
                                { id: 'sdks', label: '5. Code Examples', icon: <Code className="w-4 h-4" /> }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                                        activeTab === item.id
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                                            : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* MAIN DOCS CONTENT */}
                    <div className={`lg:col-span-9 rounded-3xl p-6 sm:p-10 border ${isDark ? 'bg-gray-900/60 border-gray-800 shadow-2xl' : 'bg-white border-gray-200 shadow-md'}`}>

                        {/* SECTION: GETTING STARTED */}
                        {activeTab === 'getting-started' && (
                            <div className="space-y-6">
                                <div className="border-b border-gray-800/50 pb-4">
                                    <h2 className="text-2xl font-bold">Getting Started</h2>
                                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>EchoGraph standard Base API Endpoint and workflow introduction.</p>
                                </div>

                                <div className={`p-4 rounded-xl font-mono text-sm border flex justify-between items-center ${isDark ? 'bg-gray-950 border-gray-800 text-cyan-400' : 'bg-gray-100 border-gray-200 text-cyan-700'}`}>
                                    <span>Base URL: http://localhost:8000</span>
                                    <button 
                                        onClick={() => copyToClipboard('http://localhost:8000', 'base_url')}
                                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                                    >
                                        {copied === 'base_url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copied === 'base_url' ? 'Copied' : 'Copy'}
                                    </button>
                                </div>

                                <div className="space-y-4 text-sm leading-relaxed">
                                    <h3 className="text-lg font-bold">Quick Integration Workflow</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                        <li><strong className="text-cyan-400">Authenticate:</strong> Sign up or Log in via <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">POST /login</code> to acquire a Bearer JWT Token.</li>
                                        <li><strong className="text-cyan-400">Ingest Knowledge:</strong> Post user facts, preferences, or conversation items to <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">POST /memory</code>.</li>
                                        <li><strong className="text-cyan-400">Retrieve Context:</strong> Query <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">POST /search</code> to receive top ranked contextual vector embeddings.</li>
                                    </ol>
                                </div>
                            </div>
                        )}

                        {/* SECTION: AUTHENTICATION */}
                        {activeTab === 'auth' && (
                            <div className="space-y-6">
                                <div className="border-b border-gray-800/50 pb-4">
                                    <h2 className="text-2xl font-bold">Authentication (JWT Bearer Token)</h2>
                                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>All memory ingestion and search endpoints require authorization header.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-base font-bold">HTTP Request Header</h3>
                                    <div className={`p-4 rounded-xl font-mono text-xs border ${isDark ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-900 text-gray-200'}`}>
                                        Authorization: Bearer YOUR_JWT_ACCESS_TOKEN
                                    </div>

                                    <h3 className="text-base font-bold mt-4">Login Endpoint</h3>
                                    <div className={`p-4 rounded-xl font-mono text-xs border ${isDark ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-900 text-gray-200'}`}>
                                        <div className="text-purple-400 font-bold mb-2">POST /login</div>
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
                                <div className="border-b border-gray-800/50 pb-4">
                                    <h2 className="text-2xl font-bold">POST /memory (Ingest Node)</h2>
                                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Embeds text content using sentence-transformers and stores into pgvector database.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-base font-bold">Request Body Parameters</h3>
                                    <div className="overflow-x-auto rounded-xl border border-gray-800">
                                        <table className="w-full text-xs text-left">
                                            <thead className={isDark ? 'bg-gray-950 text-gray-300' : 'bg-gray-100 text-gray-700'}>
                                                <tr>
                                                    <th className="p-3">Field</th>
                                                    <th className="p-3">Type</th>
                                                    <th className="p-3">Required</th>
                                                    <th className="p-3">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className={`divide-y ${isDark ? 'divide-gray-800 text-gray-400' : 'divide-gray-200 text-gray-600'}`}>
                                                <tr>
                                                    <td className="p-3 font-mono text-cyan-400">context</td>
                                                    <td className="p-3 font-mono">string</td>
                                                    <td className="p-3 text-emerald-400 font-bold">Yes</td>
                                                    <td className="p-3">Raw text context or facts to embed.</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 font-mono text-cyan-400">type</td>
                                                    <td className="p-3 font-mono">string</td>
                                                    <td className="p-3 text-emerald-400 font-bold">Yes</td>
                                                    <td className="p-3">Category enum: fact, preference, decision, goal, task, etc.</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 font-mono text-cyan-400">score</td>
                                                    <td className="p-3 font-mono">float</td>
                                                    <td className="p-3">No (Default 1.0)</td>
                                                    <td className="p-3">Importance weight multiplier (0.0 to 1.0).</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION: VECTOR SEARCH */}
                        {activeTab === 'search' && (
                            <div className="space-y-6">
                                <div className="border-b border-gray-800/50 pb-4">
                                    <h2 className="text-2xl font-bold">POST /search (Vector Retrieval)</h2>
                                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Performs cosine similarity search against user memory space with decay ranking.</p>
                                </div>

                                <div className={`p-4 rounded-xl font-mono text-xs border ${isDark ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-900 text-gray-200'}`}>
                                    <div className="text-emerald-400 font-bold mb-2">POST /search</div>
                                    <pre>{`{
  "query": "What database framework does the user prefer?",
  "type": "preference"
}`}</pre>
                                </div>
                            </div>
                        )}

                        {/* SECTION: SDKS */}
                        {activeTab === 'sdks' && (
                            <div className="space-y-6">
                                <div className="border-b border-gray-800/50 pb-4">
                                    <h2 className="text-2xl font-bold">Code Integration Snippets</h2>
                                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ready to use Python and JavaScript code snippets.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-base font-bold">Python Requests Example</h3>
                                    <div className={`p-4 rounded-xl font-mono text-xs border ${isDark ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-900 text-gray-200'}`}>
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
        </div>
    );
}