'use client'

import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle, Clock, DollarSign, TrendingUp, ExternalLink } from 'lucide-react'

interface Transaction {
  id: string
  from: string
  to: string
  amount: string
  usdValue: string
  time: string
  status: 'completed' | 'pending' | 'failed'
  savings: string
  txHash: string
}

export function TransactionTimeline() {
  // Placeholder transaction data - replace with real data from your backend
  const transactions: Transaction[] = [
    {
      id: '1',
      from: 'ETH',
      to: 'USDC',
      amount: '0.5 ETH',
      usdValue: '$1,228.12',
      time: '2 minutes ago',
      status: 'completed',
      savings: '23.45',
      txHash: '0x1234...5678'
    },
    {
      id: '2',
      from: 'USDC',
      to: 'ETH',
      amount: '780.5 USDC',
      usdValue: '$780.50',
      time: '1 hour ago',
      status: 'completed',
      savings: '12.30',
      txHash: '0xabcd...efgh'
    },
    {
      id: '3',
      from: 'ETH',
      to: 'WBTC',
      amount: '1.2 ETH',
      usdValue: '$2,947.48',
      time: '3 hours ago',
      status: 'completed',
      savings: '45.67',
      txHash: '0x9876...5432'
    },
    {
      id: '4',
      from: 'MATIC',
      to: 'ETH',
      amount: '1000 MATIC',
      usdValue: '$840.00',
      time: '6 hours ago',
      status: 'pending',
      savings: '8.90',
      txHash: '0xfedc...ba98'
    }
  ]

  return (
    <div className="glass-morphism rounded-2xl p-6 border border-purple-400/20 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center space-x-2">
          <Clock className="h-5 w-5 text-purple-400" />
          <span>Transaction Chronicle</span>
        </h3>
        <div className="text-sm text-gray-400">
          Total Saved: <span className="text-green-400 font-medium">$89.32</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-[60vh] overflow-auto">
        {transactions.map((tx, index) => (
          <TransactionCard 
            key={tx.id} 
            transaction={tx} 
            index={index}
            isLatest={index === 0}
          />
        ))}
      </div>

      {/* Timeline Footer */}
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 mx-auto">
          <span>View All Transactions</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function TransactionCard({ 
  transaction, 
  index, 
  isLatest 
}: { 
  transaction: Transaction
  index: number
  isLatest: boolean
}) {
  const getStatusConfig = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-400',
          label: 'Completed'
        }
      case 'pending':
        return {
          color: 'bg-yellow-500 animate-pulse',
          textColor: 'text-yellow-400',
          label: 'Pending'
        }
      case 'failed':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-400',
          label: 'Failed'
        }
    }
  }

  const statusConfig = getStatusConfig(transaction.status)

  return (
    <div className={cn(
      "relative p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer group",
      isLatest 
        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30 shadow-lg shadow-green-500/10" 
        : "bg-white/5 border-white/10 hover:bg-white/10"
    )}>
      {/* Timeline Connector */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-800 shadow-lg">
        <div className={cn("w-full h-full rounded-full", statusConfig.color)} />
        {isLatest && (
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        )}
      </div>
      
      <div className="ml-4">
        {/* Transaction Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <TokenPair from={transaction.from} to={transaction.to} />
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <div>
              <span className="font-medium text-white">{transaction.amount}</span>
              <div className="text-xs text-gray-400">{transaction.usdValue}</div>
            </div>
          </div>
          <TransactionStatus status={transaction.status} config={statusConfig} />
        </div>
        
        {/* Transaction Details */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">{transaction.time}</span>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              {transaction.txHash}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-3 w-3 text-green-400" />
            <span className="text-green-400 font-medium">Saved ${transaction.savings}</span>
          </div>
        </div>

        {/* Performance Indicator */}
        {transaction.status === 'completed' && (
          <div className="mt-2 flex items-center space-x-2">
            <TrendingUp className="h-3 w-3 text-green-400" />
            <span className="text-xs text-green-400">Optimal route used</span>
            <div className="flex-1 h-px bg-green-400/20" />
            <span className="text-xs text-gray-400">Gas: $2.31</span>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

function TokenPair({ from, to }: { from: string, to: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{from.slice(0, 1)}</span>
        </div>
        <span className="text-xs font-medium text-gray-300">{from}</span>
      </div>
      <ArrowRight className="h-2 w-2 text-gray-500" />
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{to.slice(0, 1)}</span>
        </div>
        <span className="text-xs font-medium text-gray-300">{to}</span>
      </div>
    </div>
  )
}

function TransactionStatus({ 
  status, 
  config 
}: { 
  status: Transaction['status']
  config: { color: string, textColor: string, label: string }
}) {
  return (
    <div className="flex items-center space-x-2">
      {status === 'completed' && <CheckCircle className="h-4 w-4 text-green-400" />}
      {status === 'pending' && <Clock className="h-4 w-4 text-yellow-400 animate-spin" />}
      <span className={cn("text-xs font-medium px-2 py-1 rounded-full", {
        'bg-green-500/20': status === 'completed',
        'bg-yellow-500/20': status === 'pending',
        'bg-red-500/20': status === 'failed'
      }, config.textColor)}>
        {config.label}
      </span>
    </div>
  )
}