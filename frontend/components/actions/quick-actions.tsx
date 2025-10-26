'use client'

import { cn } from '@/lib/utils'
import { Zap, TrendingUp, DollarSign, Target, Shield, Clock, LucideIcon } from 'lucide-react'

export function QuickActions() {
  return (
    <div className="glass-morphism rounded-2xl p-4 border border-purple-400/20 backdrop-blur-xl">
      <h3 className="text-sm font-bold text-purple-400 mb-4 flex items-center space-x-2">
        <Zap className="h-4 w-4" />
        <span>Quick Actions</span>
      </h3>
      
      <div className="space-y-3">
        <ActionButton 
          action="take-profit" 
          percentage={25} 
          icon={TrendingUp}
          color="green"
        />
        <ActionButton 
          action="dca-buy" 
          amount="$100" 
          icon={DollarSign}
          color="blue"
        />
        <ActionButton 
          action="stop-loss" 
          percentage={10} 
          icon={Shield}
          color="red"
        />
        <ActionButton 
          action="limit-order" 
          price="$2,500" 
          icon={Target}
          color="yellow"
        />
      </div>

      {/* MEV Protection Status */}
      <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
        <MEVProtection status="active" savings="$12.34" />
      </div>

      {/* Gas Optimizer */}
      <div className="mt-3">
        <GasOptimizer 
          currentGas="$2.31" 
          recommendation="Wait 5min for 30% savings"
          prediction="$1.62"
        />
      </div>
    </div>
  )
}

function ActionButton({ 
  action, 
  percentage, 
  amount, 
  price, 
  icon: Icon, 
  color 
}: { 
  action: string
  percentage?: number
  amount?: string
  price?: string
  icon: LucideIcon
  color: 'green' | 'blue' | 'red' | 'yellow'
}) {
  const getActionConfig = () => {
    switch (action) {
      case 'take-profit':
        return { label: 'Take Profit', value: `${percentage}%` }
      case 'dca-buy':
        return { label: 'DCA Buy', value: amount }
      case 'stop-loss':
        return { label: 'Stop Loss', value: `${percentage}%` }
      case 'limit-order':
        return { label: 'Limit Order', value: price }
      default:
        return { label: action, value: '' }
    }
  }

  const { label, value } = getActionConfig()

  const colorClasses = {
    green: 'bg-green-500/10 border-green-400/20 hover:bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/20 text-blue-400',
    red: 'bg-red-500/10 border-red-400/20 hover:bg-red-500/20 text-red-400',
    yellow: 'bg-yellow-500/10 border-yellow-400/20 hover:bg-yellow-500/20 text-yellow-400'
  }

  return (
    <button className={cn(
      "w-full p-3 rounded-lg border transition-all hover:scale-[1.02] group",
      colorClasses[color]
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-mono">{value}</span>
      </div>
    </button>
  )
}

function MEVProtection({ status, savings }: { status: string, savings: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-green-400" />
        <span className="text-sm text-green-400 font-medium">MEV Protection</span>
      </div>
      <div className="text-right">
        <div className="text-xs text-green-400 font-medium">{status.toUpperCase()}</div>
        <div className="text-xs text-gray-400">Saved {savings}</div>
      </div>
    </div>
  )
}

function GasOptimizer({ 
  currentGas, 
  recommendation, 
  prediction 
}: { 
  currentGas: string
  recommendation: string
  prediction: string
}) {
  return (
    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">Gas Optimizer</span>
        </div>
        <span className="text-sm font-mono text-blue-400">{currentGas}</span>
      </div>
      <div className="text-xs text-gray-400 mb-1">{recommendation}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Predicted:</span>
        <span className="text-xs font-mono text-green-400">{prediction}</span>
      </div>
    </div>
  )
}