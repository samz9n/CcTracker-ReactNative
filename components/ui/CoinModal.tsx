import React, { useContext, useState } from 'react'
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Coin } from '../../types/types'
import { WatchlistContext } from '../../store/watchlist-context'
import { Snackbar } from '@react-native-material/core'

interface ModalProps {
  isVisible: boolean
  closeModal: () => void
  coin: Coin | null
}

function CoinModal({ isVisible, closeModal, coin }: ModalProps) {
  const watchlistCtx = useContext(WatchlistContext)
  const [snackAddVisible, setSnackAddVisible] = useState(false)
  const [snackRemoveVisible, setSnackRemoveVisible] = useState(false)

  let favoriteIcon = 'heart-outline'

  if (coin !== null) {
    if (watchlistCtx.isInWatchlist(coin)) {
      favoriteIcon = 'heart'
    } else {
      favoriteIcon = 'heart-outline'
    }
  }

  function toggleWatchlist() {
    //Add coin to watchlist
    if (coin !== null && !watchlistCtx.isInWatchlist(coin)) {
      watchlistCtx.addToWatchlist(coin)
      setSnackAddVisible(true)
      setTimeout(() => {
        setSnackAddVisible(false)
      }, 2000)
    }
    if (coin !== null && watchlistCtx.isInWatchlist(coin)) {
      watchlistCtx.removeFromWatchlist(coin)
      setSnackRemoveVisible(true)
      setTimeout(() => {
        setSnackRemoveVisible(false)
      }, 2000)
    }
  }

  return (
    /* Makes the modal swipeable (swipe down to close) */
    <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => closeModal()}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.addToWatchlistBtn}
              onPress={toggleWatchlist}
            >
              <Ionicons
                name={favoriteIcon}
                size={30}
                color='rgb(255, 140, 46)'
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => closeModal()}
            >
              <Ionicons name='close' size={30} color='white' />
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.coinWrapper}>
                <Image
                  source={{ uri: coin?.image }}
                  style={styles.image}
                ></Image>
                <Text style={styles.coinName}>{coin?.name}</Text>
                <Text style={styles.coinSymbol}>
                  {coin?.symbol.toUpperCase() + '/USD'}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.coinPrice}>{coin?.price}</Text>
                  <Text style={styles.smallUsdTxt}>{'USD'}</Text>
                </View>
                {/* Add plus sign if pricechange is positive and color depending
                on positive or negative price. */}
                <Text
                  style={{
                    color:
                      coin !== null
                        ? coin.priceChange >= 0
                          ? 'rgb(96, 255, 123)'
                          : 'rgb(255, 88, 88)'
                        : 'white',
                    fontSize: 16,
                  }}
                >
                  {coin !== null
                    ? coin.priceChange >= 0
                      ? '+' + coin?.priceChange + '% today'
                      : coin?.priceChange + '% today'
                    : ''}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
        {/* render snackbar if coin is added or removed from watchlist */}
        {snackAddVisible && (
          <Snackbar
            message={`${coin?.name} added to watchlist`}
            style={styles.snackStyle}
          />
        )}
        {snackRemoveVisible && (
          <Snackbar
            message={`${coin?.name} removed from watchlist`}
            style={styles.snackStyle}
          />
        )}
      </Modal>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgb(24, 0, 26)',
    height: '82%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: 'rgb(190, 92, 11)',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
  },
  addToWatchlistBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 10,
  },
  coinWrapper: {
    alignItems: 'center',
  },
  coinName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  coinSymbol: {
    fontSize: 16,
    color: 'white',
  },
  coinPrice: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  smallUsdTxt: {
    fontSize: 14,
    color: 'grey',
    alignSelf: 'flex-start',
    paddingTop: 10,
    marginLeft: 5,
  },
  snackStyle: {
    position: 'absolute',
    start: 30,
    end: 30,
    bottom: 16,
    backgroundColor: 'rgba(184, 184, 184, 0.7)',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

export default CoinModal
