'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Activity, Volume2, Zap } from 'lucide-react'

export function MarketPulse() {
  const marketData = [
    { symbol: 'ETH', price: 2456.23, change: 2.3, volume: '+142%', trend: 'up' },
    { symbol: 'BTC', price: 66123.87, change: -0.42, volume: '+67%', trend: 'down' },
    { symbol: 'SOL', price: 176.32, change: 4.8, volume: '+89%', trend: 'up' },
    { symbol: 'MATIC', price: 0.84, change: -1.13, volume: '+23%', trend: 'down' },
  ]

  const overallSentiment = 'Bullish' // Calculate based on market data

  return (
    <div className="fixed top-20 right-4 z-40 w-80 glass-morphism rounded-2xl p-4 border border-purple-400/30 backdrop-blur-xl">
      
      {/* Market Heartbeat Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-purple-400 flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Market Pulse</span>
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
          <span className="text-xs text-green-400 font-medium">{overallSentiment}</span>
        </div>
      </div>

      {/* Live Price Movements */}
      <div className="space-y-2 mb-4">
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
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
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
      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/20 mb-4">
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

      {/* Market Sentiment Indicators */}
      <div className="space-y-3">
        <SentimentIndicator 
          label="Fear & Greed Index"
          value={78}
          status="Extreme Greed"
          color="green"
        />
        <SentimentIndicator 
          label="DEX Volume"
          value={92}
          status="Very High"
          color="blue"
        />
        <SentimentIndicator 
          label="Gas Tracker"
          value={35}
          status="Moderate"
          color="yellow"
        />
      </div>

      {/* Quick Market Action */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <button className="w-full p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-400/30 hover:from-purple-500/30 hover:to-blue-500/30 transition-all group">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="h-4 w-4 text-purple-400 group-hover:animate-pulse" />
            <span className="text-sm text-purple-400 font-medium">Market Overview</span>
          </div>
        </button>
      </div>
    </div>
  )
}

function SentimentIndicator({ 
  label, 
  value, 
  status, 
  color 
}: { 
  label: string
  value: number
  status: string
  color: 'green' | 'blue' | 'yellow' | 'red'
}) {
  const colorClasses = {
    green: 'text-green-400 bg-green-500/10 border-green-400/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-400/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-400/20',
    red: 'text-red-400 bg-red-500/10 border-red-400/20'
  }

  return (
    <div className={cn(
      "p-2 rounded-lg border",
      colorClasses[color]
    )}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-300">{label}</span>
        <span className={cn("text-xs font-medium", `text-${color}-400`)}>
          {status}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-300",
              `bg-${color}-400`
            )}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className={cn("text-xs font-mono", `text-${color}-400`)}>
          {value}
        </span>
      </div>
    </div>
  )
}