'use client'

import { cn } from '@/lib/utils'

export function PastTransactions() {
  // Placeholder list – replace with real data wired to your backend or wallet history
  const items = Array.from({ length: 25 }).map((_, i) => ({
    id: i + 1,
    time: `2025-10-26 12:${(i + 10).toString().padStart(2, '0')}`,
    pair: i % 2 === 0 ? 'ETH → USDC' : 'USDC → ETH',
    amount: i % 2 === 0 ? '-0.25 ETH' : '+780.12 USDC',
    status: 'Success',
  }))

  return (
    <div
      className={cn(
        'glass-morphism rounded-2xl border border-white/10',
        'sticky top-24',
        'max-h-[calc(100vh-8rem)] overflow-auto'
      )}
    >
      <div className="p-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur-xl z-10 rounded-t-2xl">
        <h3 className="text-sm font-semibold tracking-wide text-gray-200">Past Transactions</h3>
      </div>
      <ul className="divide-y divide-white/10">
        {items.map((tx) => (
          <li key={tx.id} className="p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{tx.pair}</div>
                <div className="text-xs text-gray-400">{tx.time}</div>
              </div>
              <div className="text-right">
                <div className="text-sm">{tx.amount}</div>
                <div className="text-xs text-green-400">{tx.status}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
