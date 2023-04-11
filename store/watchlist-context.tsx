import { createContext, ReactNode, useState, useEffect } from 'react'
import { Coin } from '../types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface WatchlistContextProps {
  watchlist: Coin[]
  addToWatchlist: (coin: Coin) => void
  removeFromWatchlist: (coin: Coin) => void
  isInWatchlist: (coin: Coin) => boolean
}

export const WatchlistContext = createContext<WatchlistContextProps>({
  watchlist: [] as Coin[],
  addToWatchlist: (coin: Coin) => {},
  removeFromWatchlist: (coin: Coin) => {},
  isInWatchlist: (coin: Coin) => false,
})

interface WatchlistContextProviderProps {
  children: ReactNode
}

export default function WatchlistContextProvider({
  children,
}: WatchlistContextProviderProps) {
  const [watchlist, setWatchlist] = useState<Coin[]>([])

  useEffect(() => {
    /* We load the watchlist from AsyncStorage when the app starts, to get users favorite coins */
    async function loadWatchlist() {
      try {
        const watchlistJSON = await AsyncStorage.getItem('@watchlist')
        if (watchlistJSON !== null) {
          setWatchlist(JSON.parse(watchlistJSON))
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadWatchlist()
  }, [])

  useEffect(() => {
    /* On every change to the watchlist, we save it to AsyncStorage */
    async function saveWatchlist() {
      try {
        await AsyncStorage.setItem('@watchlist', JSON.stringify(watchlist))
      } catch (error) {
        console.log(error)
      }
    }
    saveWatchlist()
  }, [watchlist])

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
