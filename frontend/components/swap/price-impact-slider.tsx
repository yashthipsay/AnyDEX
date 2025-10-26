'use client'

import { cn } from '@/lib/utils'

type Props = {
  value?: number // price impact percentage; negative = better, positive = worse
  maxAbs?: number // maximum absolute value represented on either side
}

export function PriceImpactSlider({ value = 0, maxAbs = 5 }: Props) {
  const clamped = Math.max(-maxAbs, Math.min(maxAbs, value))
  const position = ((clamped + maxAbs) / (2 * maxAbs)) * 100 // 0..100

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Price Impact</span>
        <span className={cn(
          'text-sm font-medium',
          value > 0.1 ? 'text-yellow-300' : value > 1 ? 'text-red-400' : 'text-green-400'
        )}>
          {value.toFixed(2)}%
        </span>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden border border-white/10"
        style={{
          background:
            'linear-gradient(90deg, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0.25) 45%, rgba(34,197,94,0.25) 55%, rgba(34,197,94,0.6) 100%)',
        }}
      >
        {/* Center marker */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 rounded-full border border-white/50 shadow-lg"
          style={{
            left: `${position}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.2) 100%)',
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        <span>-{maxAbs}%</span>
        <span>0%</span>
        <span>+{maxAbs}%</span>
      </div>
    </div>
  )
}
