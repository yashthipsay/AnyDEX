'use client'

import { useState } from 'react'
import { ArrowUpDown, Settings, Zap, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSwapStore } from '@/store/swap-store'

export function SwapInterface() {
  const [showSettings, setShowSettings] = useState(false)
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
    <div className="w-full max-w-lg mx-auto">
      {/* Main Swap Card */}
      <div className="glass-morphism rounded-2xl p-6 nebula-glow animate-float">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🌌 Galaxy Swap
          </h2>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && <SlippageSettings />}

        {/* From Token */}
        <div className="space-y-4">
          <TokenInput
            label="From"
            token={fromToken}
            amount={amount}
            onAmountChange={setAmount}
            onTokenSelect={() => {/* TODO: Open token selector */}}
            balance="1,234.56"
          />

          {/* Swap Button */}
          <div className="flex justify-center py-2">
            <button
              onClick={swapTokens}
              className="p-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 transition-all hover:scale-105"
            >
              <ArrowUpDown className="h-5 w-5 text-purple-400" />
            </button>
          </div>

          {/* To Token */}
          <TokenInput
            label="To"
            token={toToken}
            amount="0.00"
            onAmountChange={() => {}}
            onTokenSelect={() => {/* TODO: Open token selector */}}
            balance="0.00"
            readOnly
          />
        </div>

        {/* Route Information */}
        {selectedRoute && <RoutePreview route={selectedRoute} />}

        {/* Swap Button */}
        <button
          disabled={!amount || !fromToken || !toToken || isLoading}
          className={cn(
            "w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            amount && fromToken && toToken
              ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25"
              : "bg-gray-600 text-gray-400"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Finding Best Route...</span>
            </div>
          ) : !fromToken || !toToken ? (
            'Select Tokens'
          ) : !amount ? (
            'Enter Amount'
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Execute Swap</span>
            </div>
          )}
        </button>
      </div>

      {/* Route Details Card */}
      {selectedRoute && (
        <div className="mt-4 glass-morphism rounded-xl p-4">
          <RouteDetails route={selectedRoute} />
        </div>
      )}
    </div>
  )
}

function TokenInput({
  label,
  token,
  amount,
  onAmountChange,
  onTokenSelect,
  balance,
  readOnly = false
}: {
  label: string
  token: any
  amount: string
  onAmountChange: (value: string) => void
  onTokenSelect: () => void
  balance: string
  readOnly?: boolean
}) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-gray-400">{label}</label>
        <span className="text-sm text-gray-400">Balance: {balance}</span>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Token Selector */}
        <button
          onClick={onTokenSelect}
          className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors min-w-[120px]"
        >
          {token ? (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
              <span className="font-medium">{token.symbol}</span>
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
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          readOnly={readOnly}
          className={cn(
            "flex-1 bg-transparent text-right text-xl font-semibold outline-none",
            "placeholder:text-gray-500",
            readOnly && "cursor-default"
          )}
        />
      </div>
    </div>
  )
}

function SlippageSettings() {
  const [slippage, setSlippage] = useState('0.5')
  
  return (
    <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
      <h3 className="text-sm font-medium mb-3">Slippage Tolerance</h3>
      <div className="flex items-center space-x-2">
        {['0.1', '0.5', '1.0'].map((value) => (
          <button
            key={value}
            onClick={() => setSlippage(value)}
            className={cn(
              "px-3 py-1 rounded-lg text-sm transition-colors",
              slippage === value
                ? "bg-purple-500/30 text-purple-400 border border-purple-400/50"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {value}%
          </button>
        ))}
        <input
          type="text"
          value={slippage}
          onChange={(e) => setSlippage(e.target.value)}
          className="flex-1 bg-white/5 rounded-lg px-3 py-1 text-sm text-right border border-white/10 focus:border-purple-400/50 outline-none"
        />
        <span className="text-sm text-gray-400">%</span>
      </div>
    </div>
  )
}

function RoutePreview({ route }: { route: any }) {
  return (
    <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Rate</span>
        <span>1 ETH = 2,456.78 USDC</span>
      </div>
      <div className="flex justify-between items-center text-sm mt-1">
        <span className="text-gray-400">Price Impact</span>
        <span className="text-green-400">0.12%</span>
      </div>
      <div className="flex justify-between items-center text-sm mt-1">
        <span className="text-gray-400">Est. Gas</span>
        <span>$2.31</span>
      </div>
    </div>
  )
}

function RouteDetails({ route }: { route: any }) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Route Details</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Via Uniswap V3</span>
          <span>60%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Via 1inch</span>
          <span>40%</span>
        </div>
      </div>
    </div>
  )
}
