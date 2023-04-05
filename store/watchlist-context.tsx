import { createContext, ReactNode, useState } from 'react'
import { Coin } from '../types/types'

export const WatchlistContext = createContext({
  watchlist: [] as Coin[],
  addToWatchlist: (coin: Coin) => {},
  removeFromWatchlist: (coin: Coin) => {},
  isInWatchlist: (coin: Coin) => {},
})

interface WatchlistContextProviderProps {
  children: ReactNode
}

export default function WatchlistContextProvider({
  children,
}: WatchlistContextProviderProps) {
  const [watchlist, setWatchlist] = useState<Coin[]>([])

  function addToWatchlist(coin: Coin) {
    setWatchlist((prevWatchlist) => {
      return [...prevWatchlist, coin]
    })
  }

  function removeFromWatchlist(coin: Coin) {
    setWatchlist((prevWatchlist) => {
      return prevWatchlist.filter((item: Coin) => item.id !== coin.id)
    })
  }

  function isInWatchlist(coin: Coin) {
    return watchlist.some((item: Coin) => item.id === coin.id)
  }

  const value = {
    watchlist: watchlist,
    addToWatchlist: addToWatchlist,
    removeFromWatchlist: removeFromWatchlist,
    isInWatchlist: isInWatchlist,
  }

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}