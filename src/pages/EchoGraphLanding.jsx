import { motion } from "motion/react"
import './Pages.css'
import BrainBackground from "../assets/elements/BrainBackground";

import GetStarted from "./GetStarted";

import {
  Database,
  Brain,
  Search,
  Network,
  ArrowRight,
} from "lucide-react";


export default function EchoGraphLanding() {
  
  return (
    <div>

      <br /> 

      <div class="logoish-icon inline-flex items-center justify-center gap-2 px-5 py-5 h-8 w-70 rounded-full border-2 border-[#4226AA]/30 bg-[#4226AA]/5 mb-12">
      <span class="text-[#4226AA] font-bold uppercase tracking-wide">AI Semantic Memory Infrastructure</span>
      </div>


      {/* Hero */}
      <section className="relative z-10 px-8 pt-28 pb-32 max-w-7xl mx-auto">
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
    

          <h1 className="hero text-5xl leading-tight font-bold tracking-tight">
            Memory systems for
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              intelligent applications.
            </span>
          </h1>

          <br />

          <p className="description-about text-zinc-400 text-xl mt-8 max-w-2xl leading-relaxed">
            EchoGraph stores, retrieves, and ranks contextual memories using
            semantic embeddings, adaptive scoring, and vector search.
          </p>

          <br />

        
        </motion.div> */}



<section className="hero-section">
  <div className="hero-content">

    <h1 className="hero-line line1">
      Memory systems for
    </h1>

    <h1 className="hero-line gradient-text line2">
      intelligent applications.
    </h1>

    <p className="description-about fade-up">
      EchoGraph stores, retrieves, and ranks contextual memories using
      semantic embeddings, adaptive scoring, and vector search.
    </p>

  </div>
</section>





      </section>

     

    </div>
  );
}