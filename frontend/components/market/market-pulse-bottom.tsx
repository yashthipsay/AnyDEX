'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Activity, Volume2, Zap, ChevronUp, ChevronDown } from 'lucide-react'

export function MarketPulseBottom({ isExpanded, onToggle }: { isExpanded: boolean, onToggle: () => void }) {
  const marketData = useMemo(() => [
    { symbol: 'ETH', price: 2456.23, change: 2.3, volume: '+142%', trend: 'up' as const },
    { symbol: 'BTC', price: 66123.87, change: -0.42, volume: '+67%', trend: 'down' as const },
    { symbol: 'SOL', price: 176.32, change: 4.8, volume: '+89%', trend: 'up' as const },
    { symbol: 'MATIC', price: 0.84, change: -1.13, volume: '+23%', trend: 'down' as const },
    { symbol: 'AVAX', price: 32.45, change: 1.8, volume: '+45%', trend: 'up' as const },
    { symbol: 'DOT', price: 4.67, change: -2.1, volume: '+12%', trend: 'down' as const },
  ], [])

  const overallSentiment = 'Bullish' // Calculate based on market data

  return (
    <div className={cn(
      "w-full bg-black/20 border border-purple-400/20 rounded-t-2xl backdrop-blur-xl transition-all duration-300",
      isExpanded ? "h-80" : "h-16"
    )}>
      {/* Toggle Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-400/20 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-bold text-purple-400">Market Pulse</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-xs text-green-400 font-medium">{overallSentiment}</span>
          </div>
        </div>
        <button className="p-1 rounded-lg hover:bg-white/5 transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-purple-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-purple-400" />
          )}
        </button>
      </div>

      {/* Expandable Content */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isExpanded ? "opacity-100 max-h-64" : "opacity-0 max-h-0"
      )}>
        <div className="p-4">
          {/* Live Price Movements */}
          <div className="grid grid-cols-2 gap-3 mb-4 max-h-40 overflow-auto">
            {marketData.map((token) => (
              <div 
                key={token.symbol}
                className={cn(
                  "flex justify-between items-center p-3 rounded-lg border transition-all hover:scale-[1.02]",
                  token.change > 0 
                    ? "bg-green-500/10 border-green-400/20 hover:bg-green-500/15" 
                    : "bg-red-500/10 border-red-400/20 hover:bg-red-500/15"
                )}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{token.symbol.slice(0, 1)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{token.symbol}</span>
                    <div className="flex items-center space-x-1">
                      {token.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      <span className="text-xs text-gray-400">24h</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-white">
                    ${token.price.toLocaleString()}
                  </div>
                  <div className={cn(
                    "text-xs font-medium",
                    token.change > 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {token.change > 0 ? '+' : ''}{token.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Volume Surge Indicator */}
          <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/20 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">24h Volume Surge</span>
              </div>
              <span className="text-sm font-mono text-blue-400">+142%</span>
            </div>
            <div className="h-2 bg-blue-900/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 w-3/4 rounded-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>

          {/* Quick Market Action */}
          <button className="w-full p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-400/30 hover:from-purple-500/30 hover:to-blue-500/30 transition-all group">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-4 w-4 text-purple-400 group-hover:animate-pulse" />
              <span className="text-sm text-purple-400 font-medium">Market Overview</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}