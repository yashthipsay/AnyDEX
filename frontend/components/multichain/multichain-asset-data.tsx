'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

const NETWORKS = [
  { name: 'Ethereum', color: 'text-blue-300' },
  { name: 'Base', color: 'text-cyan-300' },
  { name: 'Arbitrum', color: 'text-indigo-300' },
  { name: 'Polygon', color: 'text-fuchsia-300' },
]

function pseudoRandom(seed: number) {
  // Deterministic pseudo-random in [0,1)
  const x = (seed * 1664525 + 1013904223) >>> 0
  return x / 0xffffffff
}

export function MultichainAssetData() {
  // Placeholder multichain assets – add real bridges/networks later
  const assets = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        asset: ['ETH', 'USDC', 'WBTC', 'MATIC'][i % 4],
        chain: NETWORKS[i % NETWORKS.length].name,
        balance: (pseudoRandom(i + 1) * 10).toFixed(4),
        usd: (pseudoRandom(i + 100) * 5000).toFixed(2),
      })),
    []
  )

  return (
    <div
      className={cn(
        'glass-morphism rounded-t-2xl border border-white/10',
        'sticky bottom-0',
        'h-[22vh] overflow-auto'
      )}
    >
      <div className="p-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur-xl z-10 rounded-t-2xl">
        <h3 className="text-sm font-semibold tracking-wide text-gray-200">Multichain Assets</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
        {assets.map((a) => (
          <div key={a.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                <span className="text-sm font-medium">{a.asset}</span>
              </div>
              <span className="text-xs text-gray-400">{a.chain}</span>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-sm">{a.balance}</div>
              <div className="text-xs text-gray-400">${a.usd}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
