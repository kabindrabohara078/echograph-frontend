import { motion } from "motion/react"
import './Landing.css'
import BrainBackground from "../assets/elements/BrainBackground";

import GetStarted from "./GetStarted";
import Typewriter from "../assets/elements/Typewriter";

import {
  Database,
  Brain,
  Search,
  Network,
  ArrowRight,
} from "lucide-react";


export default function Landing() {

  return (
    <div>

      <br /> <br />

      <div
      
      className="logoish-icon inline-flex items-center justify-center gap-2 px-5 py-5 h-8 w-70 rounded-full border-2 border-[#4226AA]/30 bg-[#4226AA]/5 mb-12">
        <span className="text-[#4226AA] font-bold uppercase tracking-wide">AI Semantic Memory Infrastructure</span>
      </div>


      {/* Hero */}
      <section className="main-landing">


        <section className="hero-section">
          <div className="hero-content">

            <h1 className="hero-line">
              Memory systems for
            </h1>

            
            <br />

            <h1 className="hero-line gradient-text">
              < Typewriter />
            </h1>

            <h1 className="hero-line">
              applications.
            </h1>

            <p className="description-about fade-up">
              EchoGraph stores, retrieves, and ranks contextual memories using
              semantic embeddings, adaptive scoring, and vector search.
            </p><p className="description-about fade-up">
              EchoGraph stores, retrieves, and ranks contextual memories using
              semantic embeddings, adaptive scoring, and vector search.
            </p><p className="description-about fade-up">
              EchoGraph stores, retrieves, and ranks contextual memories using
              semantic embeddings, adaptive scoring, and vector search.
            </p><p className="description-about fade-up">
              EchoGraph stores, retrieves, and ranks contextual memories using
              semantic embeddings, adaptive scoring, and vector search.
            </p><p className="description-about fade-up">
              EchoGraph stores, retrieves, and ranks contextual memories using
              semantic embeddings, adaptive scoring, and vector search.
            </p>

          </div>
        </section>

      </section>



    </div>
  );
}