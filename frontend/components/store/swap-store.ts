import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

export interface SwapRoute {
  id: string
  inputAmount: string
  outputAmount: string
  priceImpact: number
  gasEstimate: string
}

interface SwapState {
  fromToken: Token | null
  toToken: Token | null
  amount: string
  routes: SwapRoute[]
  selectedRoute: SwapRoute | null
  isLoading: boolean
  slippage: number
}

interface SwapActions {
  setFromToken: (token: Token | null) => void
  setToToken: (token: Token | null) => void
  setAmount: (amount: string) => void
  setRoutes: (routes: SwapRoute[]) => void
  setSelectedRoute: (route: SwapRoute | null) => void
  setLoading: (loading: boolean) => void
  swapTokens: () => void
  reset: () => void
}

const initialState: SwapState = {
  fromToken: null,
  toToken: null,
  amount: '',
  routes: [],
  selectedRoute: null,
  isLoading: false,
  slippage: 0.5,
}

export const useSwapStore = create<SwapState & SwapActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setFromToken: (token) => set({ fromToken: token }),
      setToToken: (token) => set({ toToken: token }),
      setAmount: (amount) => set({ amount }),
      setRoutes: (routes) => set({ routes }),
      setSelectedRoute: (route) => set({ selectedRoute: route }),
      setLoading: (isLoading) => set({ isLoading }),
      
      swapTokens: () => {
        const { fromToken, toToken } = get()
        set({
          fromToken: toToken,
          toToken: fromToken,
          amount: '',
          routes: [],
          selectedRoute: null,
        })
      },
      
      reset: () => set(initialState),
    }),
    { name: 'swap-store' }
  )
)
