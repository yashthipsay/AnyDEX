import { SwapInterface } from '@/components/swap/swap-interface'
import { GalaxyBackground } from '@/components/3d/galaxy-background'
import { Navigation } from '@/components/layout/navigation'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* 3D Galaxy Background */}
      <GalaxyBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Central Swap Interface */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[80vh]">
            <SwapInterface />
          </div>
        </div>
      </div>
    </main>
  )
}
