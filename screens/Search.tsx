import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchTop100 } from '../util/cryptoRest'
import CoinListButton from '../components/ui/CoinListButton'
import ListSeparator from '../components/ui/ListSeparator'
import LoadingSign from '../components/ui/LoadingSign'
import Searchbar from '../components/ui/Searchbar'
import { Coin } from '../types/types'
import CoinModal from '../components/ui/CoinModal'

export default function Search() {
  const [top100, setTop100] = useState<Coin[]>([])
  const [filteredCoinList, setFilteredCoinList] = useState<Coin[]>([])
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
      setFilteredCoinList(coins)
      setIsLoading(false)
    }
    getTop100()
  }, [])

  function searchFunction(text: string) {
    if (text) {
      /* we filter the top 100 coins based on the user input, and use this as the data for the FlatList */
      const filteredList = top100.filter((item) => {
        const coinName = item.name.toUpperCase()
        const txtInput = text.toUpperCase()
        const coinSymbol = item.symbol.toUpperCase()
        return (
          coinName.indexOf(txtInput) > -1 || coinSymbol.indexOf(txtInput) > -1
        )
      })
      setFilteredCoinList(filteredList)
      setSearchText(text)
    } else {
      setFilteredCoinList(top100)
      setSearchText('')
    }
  }

  function closeModal() {
    setIsModalVisible(false)
    setSelectedCoin(null)
  }

  if (isLoading) return <LoadingSign message='Fetching coins...' />

  return (
    <View style={styles.container}>
      <Searchbar
        onChangeText={(text) => searchFunction(text)}
        value={searchText}
      />
      {/* List of top 100 coins, rendered with CoinListButton component */}
      <FlatList
        data={filteredCoinList}
        renderItem={({ item }) => {
          return (
            <CoinListButton
              onPress={() => {
                setSelectedCoin(item)
                setIsModalVisible(true)
              }}
              symbol={item.symbol}
              name={item.name}
              price={item.price}
              priceChange={item.priceChange}
              image={item.image}
            />
          )
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListSeparator}
      />
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
