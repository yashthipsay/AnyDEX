'use client'

import { ArrowUpDown, Zap, ChevronDown, Activity, Clock, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSwapStore } from '@/store/swap-store'
import type { Token } from '@/store/swap-store'
import { ConfidenceSystem } from './confidence-system'
import { PriceImpactImmersive } from './price-impact-immersive'
import { RouteVisualizationLive } from './route-visualization-live'

export function TradingCockpit() {
  const { 
    fromToken, 
    toToken, 
    amount, 
    selectedRoute, 
    isLoading,
    setAmount,
    swapTokens 
  } = useSwapStore()

  return (
    <div className="relative">
      {/* Holographic Frame Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-xl animate-pulse" />
      
      {/* Main Cockpit */}
      <div className="relative glass-morphism-advanced rounded-3xl p-8 border-2 border-purple-400/30">
        
        {/* Status Bar (Like Trading Terminal) */}
        <div className="flex justify-between items-center mb-6 p-3 bg-black/20 rounded-xl border border-purple-400/20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-mono">LIVE</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Route Optimization: <span className="text-purple-400">99.7%</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-blue-400">MEV Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Gas:</span>
              <span className="text-xs text-green-400 font-mono">$2.31</span>
            </div>
          </div>
        </div>

        {/* Enhanced Token Inputs with Confidence Indicators */}
        <TokenInputAdvanced 
          label="FROM" 
          token={fromToken}
          amount={amount}
          onAmountChange={setAmount}
          onTokenSelect={() => {/* TODO: Open token selector */}}
          balance="1,234.56"
          showConfidenceBar={true}
          showLiquidityDepth={true}
        />
        
        {/* Revolutionary Swap Visualization */}
        <SwapVisualization onSwap={swapTokens} />
        
        <TokenInputAdvanced 
          label="TO" 
          token={toToken}
          amount={selectedRoute?.outputAmount ?? '0.00'}
          onAmountChange={() => {}}
          onTokenSelect={() => {/* TODO: Open token selector */}}
          balance="0.00"
          readOnly
          showTimeEstimate={true}
        />

        {/* Real-Time Route Visualization */}
        {selectedRoute && <RouteVisualizationLive route={selectedRoute} />}

        {/* Price Impact Visualization */}
        <PriceImpactImmersive impact={selectedRoute?.priceImpact ?? 0} />

        {/* Confidence System */}
        {amount && fromToken && toToken && (
          <ConfidenceSystem amount={amount} route={selectedRoute} />
        )}
        
        {/* Confidence Builder Execute Button */}
        <ExecuteButtonAdvanced 
          disabled={!amount || !fromToken || !toToken || isLoading}
          isLoading={isLoading}
          amount={amount}
          fromToken={fromToken}
          toToken={toToken}
        />
      </div>
    </div>
  )
}

function TokenInputAdvanced({
  label,
  token,
  amount,
  onAmountChange,
  onTokenSelect,
  balance,
  readOnly = false,
  showConfidenceBar = false,
  showLiquidityDepth = false,
  showTimeEstimate = false
}: {
  label: string
  token: Token | null
  amount: string
  onAmountChange: (value: string) => void
  onTokenSelect: () => void
  balance: string
  readOnly?: boolean
  showConfidenceBar?: boolean
  showLiquidityDepth?: boolean
  showTimeEstimate?: boolean
}) {
  return (
    <div className="bg-black/30 rounded-xl p-4 border border-purple-400/20 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-purple-300 font-medium">{label}</label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Balance: {balance}</span>
          {showConfidenceBar && (
            <div className="flex items-center space-x-1">
              <Activity className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">High</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Token Selector */}
        <button
          onClick={onTokenSelect}
          className="flex items-center space-x-2 bg-purple-500/20 rounded-lg px-3 py-2 hover:bg-purple-500/30 transition-colors min-w-[140px] border border-purple-400/30"
        >
          {token ? (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
              <span className="font-medium text-white">{token.symbol}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full bg-gray-600" />
              <span className="text-gray-400">Select</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </>
          )}
        </button>

        {/* Amount Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            readOnly={readOnly}
            className={cn(
              "w-full bg-transparent text-right text-xl font-semibold outline-none text-white",
              "placeholder:text-gray-500",
              readOnly && "cursor-default"
            )}
          />
          {showTimeEstimate && (
            <div className="absolute -bottom-5 right-0 flex items-center space-x-1 text-xs text-blue-400">
              <Clock className="h-3 w-3" />
              <span>~12s</span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Indicators */}
      {showLiquidityDepth && (
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-gray-400">Liquidity Depth</span>
          <span className="text-green-400">Excellent ($2.4M)</span>
        </div>
      )}
    </div>
  )
}

function SwapVisualization({ onSwap }: { onSwap: () => void }) {
  return (
    <div className="flex justify-center py-4 relative">
      {/* Connecting Line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50" />
      
      <button
        onClick={onSwap}
        className="relative p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-2 border-purple-400/50 transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
      >
        <ArrowUpDown className="h-6 w-6 text-white" />
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" />
      </button>
    </div>
  )
}

function ExecuteButtonAdvanced({ 
  disabled, 
  isLoading, 
  amount, 
  fromToken, 
  toToken 
}: { 
  disabled: boolean
  isLoading: boolean
  amount: string
  fromToken: Token | null
  toToken: Token | null
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all relative overflow-hidden",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        !disabled
          ? "bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:from-purple-600 hover:via-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
          : "bg-gray-600 text-gray-400"
      )}
    >
      {/* Background Animation */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/10 to-purple-600/0 translate-x-[-100%] animate-shimmer" />
      )}
      
      <div className="relative flex items-center justify-center space-x-2">
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>Executing Optimal Route...</span>
          </>
        ) : !fromToken || !toToken ? (
          'Select Tokens'
        ) : !amount ? (
          'Enter Amount'
        ) : (
          <>
            <Zap className="h-5 w-5" />
            <span>Execute Trade</span>
            <div className="ml-2 px-2 py-1 bg-green-500/20 rounded text-xs text-green-400">
              Save $23.45
            </div>
          </>
        )}
      </div>
    </button>
  )
}
