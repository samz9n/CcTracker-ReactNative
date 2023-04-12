import { FlatList, ViewToken } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CoinListButton from './CoinListButton'
import ListSeparator from '../../components/ui/ListSeparator'

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  price: number
  priceChange: number
}

interface Props {
  coins: Coin[]
  onPressCoin: (coin: Coin) => void
}

const keyExtractor = (item: Coin) => item.id

export default function CoinList({ coins, onPressCoin }: Props) {
  const [viewableCoins, setViewableCoins] = useState<Coin[]>([])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setViewableCoins(viewableItems.map((item) => item.item))
    },
    []
  )

  useEffect(() => {
    // Set the initial viewable coins when the component mounts
    const initialViewableCoins = coins.slice(0, 5)
    setViewableCoins(initialViewableCoins)
  }, [coins])

  const renderItem = useCallback(
    ({ item }: { item: Coin }) => {
      return (
        <CoinListButton
          onPress={() => onPressCoin(item)}
          symbol={item.symbol}
          name={item.name}
          price={item.price}
          priceChange={item.priceChange}
          image={item.image}
        />
      )
    },
    [onPressCoin]
  )

  return (
    <FlatList
      data={coins}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 50,
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}
      extraData={viewableCoins}
      ItemSeparatorComponent={ListSeparator}
    />
  )
}
