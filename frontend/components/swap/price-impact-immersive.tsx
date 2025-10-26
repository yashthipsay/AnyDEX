'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'

interface PriceImpactImmersiveProps {
  impact: number
}

export function PriceImpactImmersive({ impact }: PriceImpactImmersiveProps) {
  const getImpactColor = (impact: number) => {
    if (impact < 1) return 'text-green-400'
    if (impact < 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getImpactLabel = (impact: number) => {
    if (impact < 0.5) return 'Excellent'
    if (impact < 1) return 'Good'
    if (impact < 3) return 'Fair'
    if (impact < 5) return 'Poor'
    return 'Critical'
  }

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-red-900/20 via-yellow-900/20 to-green-900/20 rounded-xl border border-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {impact < 1 ? (
            <TrendingUp className={cn("h-4 w-4", getImpactColor(impact))} />
          ) : impact < 3 ? (
            <AlertTriangle className={cn("h-4 w-4", getImpactColor(impact))} />
          ) : (
            <TrendingDown className={cn("h-4 w-4", getImpactColor(impact))} />
          )}
          <span className="text-sm font-medium text-gray-200">Price Impact Analysis</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={cn("font-bold text-lg", getImpactColor(impact))}>
            {impact.toFixed(2)}%
          </span>
          <span className={cn("text-xs px-2 py-1 rounded-full", {
            'bg-green-500/20 text-green-400': impact < 1,
            'bg-yellow-500/20 text-yellow-400': impact >= 1 && impact < 3,
            'bg-red-500/20 text-red-400': impact >= 3
          })}>
            {getImpactLabel(impact)}
          </span>
        </div>
      </div>
      
      {/* 3D-style Impact Visualizer */}
      <div className="relative h-12 bg-gradient-to-r from-red-500/30 via-yellow-500/30 to-green-500/30 rounded-full overflow-hidden border border-white/10 shadow-inner">
        {/* Zone Separators */}
        <div className="absolute inset-0 flex">
          <div className="w-1/3 border-r border-red-400/30" />
          <div className="w-1/3 border-r border-yellow-400/30" />
          <div className="w-1/3" />
        </div>

        {/* Animated Impact Indicator */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full shadow-lg border-2 border-white transition-all duration-500 z-10"
          style={{ 
            left: `${Math.max(5, Math.min(85, 85 - (impact * 8)))}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(147,51,234,0.8) 60%, rgba(59,130,246,0.6) 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse opacity-80" />
        </div>
        
        {/* Impact Zones with Labels */}
        <div className="absolute inset-0 flex text-xs font-medium">
          <div className="flex-1 flex items-center justify-center text-red-200/80">
            <span>Avoid</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-yellow-200/80">
            <span>Caution</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-green-200/80">
            <span>Optimal</span>
          </div>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute top-0 w-8 h-full opacity-60 blur-sm transition-all duration-500"
          style={{ 
            left: `${Math.max(1, Math.min(81, 81 - (impact * 8)))}%`,
            background: impact < 1 ? 
              'linear-gradient(to bottom, rgba(34,197,94,0.6), rgba(34,197,94,0))' :
              impact < 3 ?
              'linear-gradient(to bottom, rgba(234,179,8,0.6), rgba(234,179,8,0))' :
              'linear-gradient(to bottom, rgba(239,68,68,0.6), rgba(239,68,68,0))'
          }}
        />
      </div>

      {/* Impact Scale */}
      <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1">
        <span className="text-red-400">High Impact</span>
        <span className="text-yellow-400">Medium</span>
        <span className="text-green-400">Low Impact</span>
      </div>

      {/* Additional Impact Info */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <div className="text-gray-400">
          Expected slippage: <span className={getImpactColor(impact)}>{(impact * 0.8).toFixed(2)}%</span>
        </div>
        <div className="text-gray-400">
          Market depth: <span className="text-blue-400">Strong</span>
        </div>
      </div>
    </div>
  )
}
