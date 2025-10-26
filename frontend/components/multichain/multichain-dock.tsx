'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown, Wallet } from 'lucide-react'

const NETWORKS = [
  { name: 'Ethereum', symbol: 'ETH', color: 'from-blue-400 to-blue-600' },
  { name: 'Base', symbol: 'BASE', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Arbitrum', symbol: 'ARB', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Polygon', symbol: 'MATIC', color: 'from-purple-400 to-purple-600' },
  { name: 'Optimism', symbol: 'OP', color: 'from-red-400 to-red-600' },
]

function pseudoRandom(seed: number) {
  const x = (seed * 1664525 + 1013904223) >>> 0
  return x / 0xffffffff
}

export function MultichainDock({ isExpanded, onToggle }: { isExpanded: boolean, onToggle: () => void }) {
  const assets = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        asset: ['ETH', 'USDC', 'WBTC', 'MATIC', 'OP'][i % 5],
        network: NETWORKS[i % NETWORKS.length],
        balance: (pseudoRandom(i + 1) * 10).toFixed(4),
        usdValue: (pseudoRandom(i + 100) * 5000).toFixed(2),
        change24h: (pseudoRandom(i + 200) * 10 - 5).toFixed(2)
      })),
    []
  )

  const totalPortfolioValue = assets.reduce((sum, asset) => sum + parseFloat(asset.usdValue), 0)

  return (
    <div
      className={cn(
        "w-full bg-black/30 border border-purple-400/20 rounded-t-2xl backdrop-blur-xl transition-all duration-300 text-white",
        isExpanded ? "h-80" : "h-16",
        "relative z-10 pointer-events-auto"
      )}
    >
      {/* Toggle Header (always clickable, full width, high z-index) */}
      <div
        className="flex items-center justify-between p-4 border-b border-purple-400/20 cursor-pointer select-none relative z-20"
        style={{ pointerEvents: 'auto' }}
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          <Wallet className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-bold text-purple-400">Multichain Portfolio</h3>
          <span className="text-xs text-gray-400">
            ${totalPortfolioValue.toLocaleString()}
          </span>
        </div>
        <span className="p-1 rounded-lg hover:bg-white/5 transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-purple-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-purple-400" />
          )}
        </span>
      </div>

      {/* Expandable Content */}
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isExpanded ? "opacity-100 max-h-72" : "opacity-0 max-h-0"
        )}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        <div className="p-4">
          {/* Portfolio Summary */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              Total Value: <span className="text-white font-medium">${totalPortfolioValue.toLocaleString()}</span>
            </span>
            <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              View All Assets
            </button>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-56 overflow-auto">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface AssetData {
  id: number
  asset: string
  network: { name: string; symbol: string; color: string }
  balance: string
  usdValue: string
  change24h: string
}

function AssetCard({ asset }: { asset: AssetData }) {
  const changeColor = parseFloat(asset.change24h) >= 0 ? 'text-green-400' : 'text-red-400'
  
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
      {/* Network Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className={cn(
          "w-6 h-6 rounded-full bg-gradient-to-r flex items-center justify-center",
          asset.network.color
        )}>
          <span className="text-xs font-bold text-white">{asset.asset.slice(0, 1)}</span>
        </div>
        <span className="text-xs text-gray-400">{asset.network.symbol}</span>
      </div>
      
      {/* Asset Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">{asset.asset}</span>
          <span className={cn("text-xs font-medium", changeColor)}>
            {parseFloat(asset.change24h) >= 0 ? '+' : ''}{asset.change24h}%
          </span>
        </div>
        
        <div className="text-xs text-gray-400">{asset.balance}</div>
        <div className="text-xs text-gray-300 font-medium">${asset.usdValue}</div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}