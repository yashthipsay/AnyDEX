'use client'

import { cn } from '@/lib/utils'
import { Shield, TrendingUp, Zap, CheckCircle, LucideIcon } from 'lucide-react'
import type { SwapRoute } from '@/store/swap-store'

interface ConfidenceSystemProps {
  amount: string
  route: SwapRoute | null
}

export function ConfidenceSystem({ amount, route }: ConfidenceSystemProps) {
  const confidenceScore = calculateConfidence(amount, route)
  
  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-400/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-green-400 flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Transaction Confidence</span>
        </span>
        <span className="text-lg font-bold text-green-400">{confidenceScore}%</span>
      </div>
      
      {/* Visual Confidence Bar */}
      <div className="flex space-x-1 mb-3">
        {Array.from({length: 10}).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-2 flex-1 rounded transition-all duration-300",
              i < confidenceScore / 10 
                ? 'bg-gradient-to-t from-green-400 to-emerald-300 shadow-sm shadow-green-400/50' 
                : 'bg-gray-700'
            )}
          />
        ))}
      </div>
      
      {/* Confidence Factors */}
      <div className="space-y-2">
        <ConfidenceFactor 
          label="Liquidity Depth" 
          value="Excellent" 
          color="green" 
          icon={TrendingUp}
        />
        <ConfidenceFactor 
          label="Price Impact" 
          value={route?.priceImpact && route.priceImpact < 1 ? "Minimal" : "Moderate"} 
          color={route?.priceImpact && route.priceImpact < 1 ? "green" : "yellow"} 
          icon={Zap}
        />
        <ConfidenceFactor 
          label="Route Reliability" 
          value="Verified" 
          color="blue" 
          icon={CheckCircle}
        />
      </div>
    </div>
  )
}

function ConfidenceFactor({ 
  label, 
  value, 
  color, 
  icon: Icon 
}: { 
  label: string
  value: string
  color: 'green' | 'yellow' | 'blue' | 'red'
  icon: LucideIcon
}) {
  const colorClasses = {
    green: 'text-green-400 bg-green-500/10',
    yellow: 'text-yellow-400 bg-yellow-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
    red: 'text-red-400 bg-red-500/10'
  }

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center space-x-2 text-gray-300">
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </div>
      <div className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        colorClasses[color]
      )}>
        {value}
      </div>
    </div>
  )
}

function calculateConfidence(amount: string, route: SwapRoute | null): number {
  let score = 70 // Base confidence

  // Amount factor
  const amountNum = parseFloat(amount)
  if (amountNum > 0) {
    if (amountNum < 100) score += 20 // Small amounts are safer
    else if (amountNum < 1000) score += 15
    else if (amountNum < 10000) score += 10
    else score += 5 // Large amounts have more risk
  }

  // Route factor
  if (route) {
    if (route.priceImpact < 0.5) score += 10
    else if (route.priceImpact < 1) score += 5
    else if (route.priceImpact < 3) score -= 5
    else score -= 15

    // Gas estimate factor (assuming reasonable gas)
    const gasUSD = parseFloat(route.gasEstimate.replace('$', '')) || 0
    if (gasUSD < 5) score += 5
    else if (gasUSD > 20) score -= 10
  }

  return Math.min(98, Math.max(30, score)) // Clamp between 30-98%
}
