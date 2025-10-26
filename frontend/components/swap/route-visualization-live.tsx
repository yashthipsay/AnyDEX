'use client'

import { cn } from '@/lib/utils'
import type { SwapRoute } from '@/store/swap-store'
import { Activity, Clock, TrendingUp, Route, DollarSign } from 'lucide-react'

interface RouteVisualizationLiveProps {
  route: SwapRoute
}

export function RouteVisualizationLive({ route }: RouteVisualizationLiveProps) {
  return (
    <div className="my-6 p-4 bg-black/20 rounded-xl border border-purple-400/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-purple-400 flex items-center space-x-2">
          <Route className="h-4 w-4" />
          <span>Optimal Route Discovery</span>
        </h4>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-mono">OPTIMIZING</span>
        </div>
      </div>
      
      {/* Animated Route Pathway */}
      <div className="relative mb-4">
        {/* Route Nodes */}
        <div className="flex items-center justify-between relative">
          <RouteNode name="Uniswap V3" percentage={60} delay={0} />
          <AnimatedPath />
          <RouteNode name="1inch" percentage={40} delay={200} />
        </div>
      </div>
        
      {/* Route Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/20">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <DollarSign className="h-3 w-3 text-green-400" />
            <div className="text-xs text-green-400">Savings</div>
          </div>
          <div className="font-mono text-green-400 font-bold">$23.45</div>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/20">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Clock className="h-3 w-3 text-blue-400" />
            <div className="text-xs text-blue-400">Time</div>
          </div>
          <div className="font-mono text-blue-400 font-bold">~12s</div>
        </div>
        <div className="p-3 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-400/20">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Activity className="h-3 w-3 text-purple-400" />
            <div className="text-xs text-purple-400">Hops</div>
          </div>
          <div className="font-mono text-purple-400 font-bold">2</div>
        </div>
      </div>

      {/* Live Route Details */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Route ID</span>
          <span className="font-mono text-blue-400">{route.id}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-400">Gas Estimate</span>
          <span className="text-green-400">{route.gasEstimate}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-400">Price Impact</span>
          <span className={cn(
            route.priceImpact < 1 ? 'text-green-400' :
            route.priceImpact < 3 ? 'text-yellow-400' : 'text-red-400'
          )}>
            {route.priceImpact.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}

function RouteNode({ name, percentage, delay }: { name: string, percentage: number, delay: number }) {
  return (
    <div 
      className="relative z-10 flex flex-col items-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Node Circle */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-purple-400/50 flex items-center justify-center shadow-lg">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping" />
        
        {/* Percentage Badge */}
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {percentage}%
        </div>
      </div>
      
      {/* Node Label */}
      <div className="mt-2 text-center">
        <div className="text-xs font-medium text-white">{name}</div>
        <div className="text-xs text-gray-400">DEX</div>
      </div>
    </div>
  )
}

function AnimatedPath() {
  return (
    <div className="flex-1 relative mx-4">
      {/* Base Path */}
      <div className="h-0.5 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 rounded-full opacity-50" />
      
      {/* Animated Flow */}
      <div className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-80 animate-pulse" />
      
      {/* Flow Particles */}
      <div className="absolute top-1/2 left-0 w-1 h-1 bg-white rounded-full animate-flow-right" />
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-flow-right animation-delay-300" />
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-flow-right animation-delay-600" />
    </div>
  )
}