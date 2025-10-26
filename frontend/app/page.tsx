import { TradingCockpit } from '@/components/swap/trading-cockpit'
import { GalaxyAuroraBackground } from '@/components/3d/galaxy-aurora-background'
import { Navigation } from '@/components/layout/navigation'
import { TransactionTimeline } from '@/components/history/transaction-timeline'
import { QuickActions } from '@/components/actions/quick-actions'
import { BottomDock } from '@/components/layout/bottom-dock'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Aurora Background */}
      <GalaxyAuroraBackground />
      
      {/* Floating Navigation */}
      <Navigation />
      
  {/* Removed redundant floating Market Pulse to avoid overlap with Transaction Timeline */}
      
      {/* Main Trading Interface */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-24 pb-32">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Sidebar - Market Context */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <QuickActions />
            </div>
            
            {/* Center - Trading Cockpit */}
            <div className="col-span-12 lg:col-span-6">
              <div className="sticky top-24">
                <TradingCockpit />
              </div>
            </div>
            
            {/* Right Sidebar - Transaction History */}
            <div className="col-span-12 lg:col-span-3">
              <TransactionTimeline />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Dock - Collapsible Multichain & Market Pulse */}
      <BottomDock />
    </div>
  )
}
