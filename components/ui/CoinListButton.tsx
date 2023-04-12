import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback } from 'react'

interface CoinListButtonProps {
  onPress: () => void
  symbol: string
  name: string
  price: number
  priceChange: number
  image: string
}

function CoinListButton({
  onPress,
  symbol,
  name,
  price,
  priceChange,
  image,
}: CoinListButtonProps) {
  const handlePress = useCallback(() => {
    onPress()
  }, [onPress])

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => {
          return [
            {
              backgroundColor: pressed ? 'rgb(60, 49, 70)' : 'rgb(13, 0, 24)',
            },
          ]
        }}
      >
        <View style={styles.buttonInner}>
          <View style={styles.imgView}>
            <Image source={{ uri: image }} style={styles.img} />
          </View>
          <View style={styles.textAndPriceContainer}>
            <View style={styles.textAndPrice}>
              <Text style={styles.symbolAndPrice}>
                {symbol.toUpperCase() + '/USD'}
              </Text>
              <Text style={{ color: 'rgb(216, 213, 213)' }}>{name}</Text>
            </View>
            <View style={styles.textAndPrice}>
              <Text style={[styles.symbolAndPrice, styles.priceAlignRight]}>
                {price}
              </Text>
              {/* Add plus sign if pricechange is positive and color depending on positive or negative price. */}
              <Text
                style={{
                  color:
                    priceChange >= 0 ? 'rgb(96, 255, 123)' : 'rgb(255, 88, 88)',
                  textAlign: 'right',
                }}
              >
                {priceChange >= 0 ? '+' + priceChange + '%' : priceChange + '%'}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}
export default React.memo(CoinListButton)

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgb(13, 0, 24)',
    height: 70,
    marginHorizontal: 10,
  },
  buttonInner: {
    width: '100%',
    flexDirection: 'row',
    height: '100%',
  },
  textAndPriceContainer: {
    flexDirection: 'row',
    flex: 5,
    justifyContent: 'space-between',
    padding: 5,
  },
  textAndPrice: {
    justifyContent: 'space-between',
  },
  imgView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: 40, height: 40 },
  symbolAndPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  priceAlignRight: {
    textAlign: 'right',
  },
})
