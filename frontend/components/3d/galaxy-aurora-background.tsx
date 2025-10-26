'use client'

import { useMemo } from 'react'

function pseudoRandom(seed: number) {
  const x = (seed * 1664525 + 1013904223) >>> 0
  return x / 0xffffffff
}

export function GalaxyAuroraBackground() {
  // Generate deterministic particle positions
  const particles = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: pseudoRandom(i + 1) * 100,
      top: pseudoRandom(i + 50) * 100,
      delay: pseudoRandom(i + 100) * 10,
      duration: 15 + pseudoRandom(i + 150) * 10
    })), []
  )

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base Galaxy */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Aurora Layers */}
      <div className="absolute inset-0">
        {/* Primary Aurora */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-aurora-1" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-blue-500/15 to-transparent rounded-full blur-3xl animate-aurora-2" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl animate-aurora-3" />
        
        {/* Secondary Aurora Waves */}
        <div className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-aurora-wave-1" />
        <div className="absolute top-1/3 left-0 w-full h-24 bg-gradient-to-r from-transparent via-blue-500/3 to-transparent animate-aurora-wave-2" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
      
      {/* Nebula Clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-radial from-purple-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-radial from-blue-600/8 via-blue-600/3 to-transparent rounded-full blur-2xl animate-pulse-slow-delayed" />
      </div>
    </div>
  )
}