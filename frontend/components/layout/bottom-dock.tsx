'use client'

import { useState } from 'react'
import { MultichainDock } from '@/components/multichain/multichain-dock'
import { MarketPulseBottom } from '@/components/market/market-pulse-bottom'

export function BottomDock() {
  const [isMultichainExpanded, setIsMultichainExpanded] = useState(false)
  const [isMarketExpanded, setIsMarketExpanded] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="container mx-auto px-4">
        {/* Independent absolute panels ensure one expanding doesn't lift the other */}
        <div className="relative h-0">
          {/* Multichain Portfolio - 70% */}
          <div className="absolute bottom-0 left-0 w-[70%] pr-2 pointer-events-auto">
            <MultichainDock 
              isExpanded={isMultichainExpanded}
              onToggle={() => {
                setIsMultichainExpanded((prev) => {
                  const next = !prev
                  if (next) setIsMarketExpanded(false)
                  return next
                })
              }}
            />
          </div>

          {/* Market Pulse - 30% */}
          <div className="absolute bottom-0 right-0 w-[30%] pl-2 pointer-events-auto">
            <MarketPulseBottom
              isExpanded={isMarketExpanded}
              onToggle={() => {
                setIsMarketExpanded((prev) => {
                  const next = !prev
                  if (next) setIsMultichainExpanded(false)
                  return next
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}