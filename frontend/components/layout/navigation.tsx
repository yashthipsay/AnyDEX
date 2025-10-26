'use client'

import { useState } from 'react'
import { Wallet, Settings, Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative z-50 w-full">
      <div className="glass-morphism border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Zap className="h-8 w-8 text-purple-400" />
                <div className="absolute inset-0 animate-pulse">
                  <Zap className="h-8 w-8 text-purple-400/50" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Galaxy DEX
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/swap" active>Swap</NavLink>
              <NavLink href="/pools">Pools</NavLink>
              <NavLink href="/analytics">Analytics</NavLink>
              <NetworkSelector />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Settings className="h-5 w-5 text-gray-400" />
              </button>
              
              <WalletButton />

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-2 mt-4">
                <NavLink href="/swap" mobile active>Swap</NavLink>
                <NavLink href="/pools" mobile>Pools</NavLink>
                <NavLink href="/analytics" mobile>Analytics</NavLink>
                <div className="pt-2">
                  <NetworkSelector mobile />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  children, 
  active = false, 
  mobile = false 
}: { 
  href: string
  children: React.ReactNode
  active?: boolean
  mobile?: boolean 
}) {
  return (
    <a
      href={href}
      className={cn(
        "transition-colors relative group",
        mobile ? "block py-2 px-4 rounded-lg" : "py-2",
        active 
          ? "text-purple-400" 
          : "text-gray-300 hover:text-white",
        mobile && active && "bg-purple-500/20"
      )}
    >
      {children}
      {!mobile && active && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
      )}
    </a>
  )
}

function NetworkSelector({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={cn("relative", mobile && "w-full")}>
      <select className={cn(
        "appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent",
        "cursor-pointer transition-all",
        mobile && "w-full"
      )}>
        <option value="all">🌐 All Networks</option>
        <option value="ethereum">⚡ Ethereum</option>
        <option value="base">🔵 Base</option>
        <option value="arbitrum">🟡 Arbitrum</option>
        <option value="polygon">🟣 Polygon</option>
      </select>
    </div>
  )
}

function WalletButton() {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <button 
      className={cn(
        "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all",
        isConnected 
          ? "bg-green-500/20 text-green-400 border border-green-400/30" 
          : "bg-purple-500/20 text-purple-400 border border-purple-400/30 hover:bg-purple-500/30"
      )}
      onClick={() => setIsConnected(!isConnected)}
    >
      <Wallet className="h-4 w-4" />
      <span className="hidden sm:inline">
        {isConnected ? '0x1234...5678' : 'Connect Wallet'}
      </span>
    </button>
  )
}
