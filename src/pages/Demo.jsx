import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, HelpCircle, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function DemoPage({ dark }) {
  const navigate = useNavigate();

  // ========================================================
  // CORE THEMING LOGIC (Based on the 'dark' prop)
  // ========================================================
  const themeClasses = dark 
    ? {
        wrapper: "bg-[#333] text-white",
        container: "bg-black border-gray-800",
        pill: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        subtitle: "text-gray-400",
        stepNum: "text-gray-800",
        footerLine: "border-gray-800"
      }
    : {
        wrapper: "bg-gray-100 text-black",
        container: "bg-white border-gray-200 shadow-md",
        pill: "bg-blue-100 text-blue-600 border-blue-200",
        subtitle: "text-gray-600",
        stepNum: "text-gray-300",
        footerLine: "border-gray-200"
      };

  return (
    <div className={`${themeClasses.wrapper} min-h-screen font-sans transition-colors duration-300 pt-20 pb-16 px-6 relative overflow-hidden`}>
        <br />
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* ================================================= */}
        {/* 1. DEMO TITLE HEADER */}
        {/* ================================================= */}
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${themeClasses.pill}`}>
            <HelpCircle size={12} className="mr-1" /> Guided Walkthrough
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Understanding the EchoGraph Sandbox
          </h1>
          <p className={`${themeClasses.subtitle} max-w-xl mx-auto text-sm sm:text-base`}>
            Before diving into your live data workspace, review this brief structural demo layout to understand how our core pipeline surfaces memory layers.
          </p>
        </div>

        {/* ================================================= */}
        {/* 2. CORE DEMO ARCHITECTURE INFO */}
        {/* ================================================= */}
        <div className={`border p-8 rounded-2xl space-y-8 ${themeClasses.container}`}>
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-2">How the Core MVP Evaluates Queries</h2>
            <p className={`${themeClasses.subtitle} text-xs sm:text-sm leading-relaxed`}>
              EchoGraph turns your user raw conversational text into clean semantic nodes using an isolated vector chunk loop. The next workspace window allows you to run live text transformations against this sequence.
            </p>
          </div>

          {/* Three-step visual breakdown mapping the test environment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="space-y-2 relative">
              <div className={`text-4xl font-black font-mono select-none ${themeClasses.stepNum}`}>01</div>
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Layers size={16} className="text-cyan-500" />
                <span>Text Ingestion</span>
              </div>
              <p className={`${themeClasses.subtitle} text-xs leading-relaxed`}>
                You supply the model with raw strings or array payloads directly inside the input terminals.
              </p>
            </div>

            <div className="space-y-2 relative">
              <div className={`text-4xl font-black font-mono select-none ${themeClasses.stepNum}`}>02</div>
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Cpu size={16} className="text-blue-500" />
                <span>HNSW Clustering</span>
              </div>
              <p className={`${themeClasses.subtitle} text-xs leading-relaxed`}>
                Our system computes similarity vectors and calculates absolute distance metrics across indices.
              </p>
            </div>

            <div className="space-y-2 relative">
              <div className={`text-4xl font-black font-mono select-none ${themeClasses.stepNum}`}>03</div>
              <div className="flex items-center space-x-2 font-bold text-sm">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Surfacing Top-3</span>
              </div>
              <p className={`${themeClasses.subtitle} text-xs leading-relaxed`}>
                Noise profiles are deleted instantly, leaving only the top 3 contextual memories for your agent.
              </p>
            </div>

          </div>

          {/* Info Notice Box */}
          <div className={`border-l-2 border-cyan-500 pl-4 py-2 my-4 text-xs italic ${themeClasses.subtitle}`}>
            Note: The next text playground page works directly with our temporary simulated local cluster cache. No permanent storage parameters will be adjusted during this evaluation sequence.
          </div>
        </div>

        {/* ================================================= */}
        {/* 3. TERMINAL CALL TO ACTION (REDIRECT ROUTER) */}
        {/* ================================================= */}
        <div className="text-center pt-4">
          <Link to='/test'>
          <button
            
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-bold text-sm tracking-wide px-8 py-3.5 rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer transform hover:-translate-y-0.5 transition-all"
            >
            <span>Proceed to Text Playground</span>
            <Play size={14} fill="currentColor" />
          </button>
            </Link>
          
          {/* <p className={`text-[11px] mt-3 ${themeClasses.subtitle}`}>
            By clicking enter, you will initialize the `/test` page route.
          </p> */}
        </div>

        {/* Mini Structural System Footer marker */}
        <div className={`border-t pt-6 text-center text-[10px] uppercase font-bold tracking-widest text-gray-500 ${themeClasses.footerLine}`}>
          EchoGraph Cognitive Architecture Labs • MVP Core v1.0
        </div>

      </div>
    </div>
  );
}