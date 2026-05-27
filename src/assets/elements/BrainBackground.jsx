import { motion } from "motion/react";

export default function BrainBackground() {
  const nodes = [
    { x: "20%", y: "30%" },
    { x: "40%", y: "20%" },
    { x: "60%", y: "35%" },
    { x: "35%", y: "55%" },
    { x: "55%", y: "65%" },
    { x: "75%", y: "45%" },
    { x: "50%", y: "80%" },
  ];

  const lines = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 5],
    [3, 4],
    [4, 6],
    [2, 4],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl" />

      {/* SVG Brain Network */}
      <svg className="w-full h-full absolute inset-0">
        
        {/* Lines */}
        {lines.map(([start, end], i) => (
          <motion.line
            key={i}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="rgba(34,211,238,0.25)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="6"
            fill="rgba(34,211,238,0.9)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}