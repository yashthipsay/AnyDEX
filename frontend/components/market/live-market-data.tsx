'use client'

import { cn } from '@/lib/utils'

export function LiveMarketData() {
  // Placeholder market data – swap with real-time feeds later
  const entries = [
    { symbol: 'ETH', price: 2485.23, change: +1.24 },
    { symbol: 'BTC', price: 66123.87, change: -0.42 },
    { symbol: 'SOL', price: 176.32, change: +2.88 },
    { symbol: 'MATIC', price: 0.84, change: -1.13 },
  ]

  const longList = Array.from({ length: 20 }, (_, i) => entries[i % entries.length])

  return (
    <div
      className={cn(
        'glass-morphism rounded-2xl border border-white/10',
        'sticky top-24',
        'max-h-[calc(100vh-8rem)] overflow-auto'
      )}
    >
      <div className="p-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur-xl z-10 rounded-t-2xl">
        <h3 className="text-sm font-semibold tracking-wide text-gray-200">Live Market Data</h3>
      </div>
      <div className="divide-y divide-white/10">
        {longList.map((e, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
              <div>
                <div className="font-medium">{e.symbol}</div>
                <div className="text-xs text-gray-400">24h</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">${e.price.toLocaleString()}</div>
              <div className={cn('text-xs', e.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {e.change >= 0 ? '+' : ''}{e.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
