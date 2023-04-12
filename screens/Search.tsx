import { StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { fetchTop100 } from '../util/cryptoRest'
import LoadingSign from '../components/ui/LoadingSign'
import Searchbar from '../components/ui/Searchbar'
import { Coin } from '../types/types'
import CoinModal from '../components/ui/CoinModal'
import CoinList from '../components/ui/CoinList'

export default function Search() {
  const [top100, setTop100] = useState<Coin[]>([])
  /* const [filteredCoinList, setFilteredCoinList] = useState<Coin[]>([]) */
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null)

  /* We fetch the top 100 coins and set them to state so we can map them later on */
  useEffect(() => {
    async function getTop100() {
      setIsLoading(true)
      const coins = await fetchTop100()
      setTop100(coins)
      /* setFilteredCoinList(coins) */
      setIsLoading(false)
    }
    getTop100()
  }, [])

  const handleSearch = useCallback((text: string) => {
    setSearchText(text)
  }, [])

  const filteredCoins = useMemo(() => {
    const filteredList = top100.filter((item) => {
      const coinName = item.name.toUpperCase()
      const txtInput = searchText.toUpperCase()
      const coinSymbol = item.symbol.toUpperCase()
      return (
        coinName.indexOf(txtInput) > -1 || coinSymbol.indexOf(txtInput) > -1
      )
    })
    return filteredList
  }, [top100, searchText])

  function closeModal() {
    setIsModalVisible(false)
    setSelectedCoin(null)
  }

  function onPressCoin(coin: Coin) {
    setSelectedCoin(coin)
    setIsModalVisible(true)
  }

  if (isLoading) return <LoadingSign message='Fetching coins...' />

  return (
    <View style={styles.container}>
      <Searchbar onChangeText={handleSearch} value={searchText} />
      {/* List of top 100 coins, rendered with CoinListButton component */}
      <CoinList coins={filteredCoins} onPressCoin={onPressCoin}></CoinList>
      <CoinModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        coin={selectedCoin}
      ></CoinModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(13, 0, 24)',
  },
})
