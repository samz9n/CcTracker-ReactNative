import { FlatList, StyleSheet, View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { WatchlistContext } from '../store/watchlist-context'
import { Coin } from '../types/types'
import CoinListButton from '../components/ui/CoinListButton'
import ListSeparator from '../components/ui/ListSeparator'
import CoinModal from '../components/ui/CoinModal'
import Searchbar from '../components/ui/Searchbar'

export default function Watchlist() {
  const watchlistCtx = useContext(WatchlistContext)
  const watchlist = watchlistCtx.watchlist
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filteredWatchList, setFilteredWatchList] = useState<Coin[]>([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setFilteredWatchList(watchlist)
  }, [watchlist])

  function searchFunction(text: string) {
    if (text) {
      /* we filter the watchlist coins based on the user input, and use this as the data for the FlatList */
      const filteredList = watchlist.filter((item) => {
        const coinName = item.name.toUpperCase()
        const txtInput = text.toUpperCase()
        const coinSymbol = item.symbol.toUpperCase()
        return (
          coinName.indexOf(txtInput) > -1 || coinSymbol.indexOf(txtInput) > -1
        )
      })
      setFilteredWatchList(filteredList)
      setSearchText(text)
    } else {
      setFilteredWatchList(watchlist)
      setSearchText('')
    }
  }

  function closeModal() {
    setIsModalVisible(false)
    setSelectedCoin(null)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        onChangeText={(text) => searchFunction(text)}
        value={searchText}
      />
      {filteredWatchList.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.emptyList}>
            No coins in watchlist.{'\n'}Start by adding your favorite coins in
            the "Search" section!{' '}
          </Text>
        </View>
      )}
      <FlatList
        data={filteredWatchList}
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
  emptyList: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
  },
})
