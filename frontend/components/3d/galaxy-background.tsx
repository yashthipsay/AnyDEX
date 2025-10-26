'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <NebulaParticles />
      </Canvas>
    </div>
  )
}

function Stars() {
  const ref = useRef<THREE.Points>(null!)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
      ref.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </Points>
  )
}

function NebulaParticles() {
  const ref = useRef<THREE.Points>(null!)
  
  const positions = useMemo(() => {
    const positions = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        color="#3b82f6"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </Points>
  )
}
