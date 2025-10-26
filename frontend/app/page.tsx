import { SwapInterface } from '@/components/swap/swap-interface'
import { GalaxyBackground } from '@/components/3d/galaxy-background'
import { Navigation } from '@/components/layout/navigation'
import { PastTransactions } from '@/components/history/past-transactions'
import { LiveMarketData } from '@/components/market/live-market-data'
import { MultichainAssetData } from '@/components/multichain/multichain-asset-data'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* 3D Galaxy Background */}
      <GalaxyBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />

        {/* Three-column layout */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Past Transactions */}
            <div className="order-2 lg:order-1">
              <PastTransactions />
            </div>

            {/* Center: Swap (sticky with internal content) */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                <SwapInterface />
              </div>
            </div>

            {/* Right: Live Market Data */}
            <div className="order-3 lg:order-3">
              <LiveMarketData />
            </div>
          </div>
        </div>

        {/* Bottom: Multichain Asset Data (sticky to bottom) */}
        <div className="container mx-auto px-4 pb-4">
          <MultichainAssetData />
        </div>
      </div>
    </main>
  )
}
