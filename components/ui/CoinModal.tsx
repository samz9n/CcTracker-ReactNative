import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Coin } from '../../types/types'
import { WatchlistContext } from '../../store/watchlist-context'
import { Snackbar } from '@react-native-material/core'
import { getCandleChartData } from '../../util/cryptoRest'
import { CandlestickChart } from 'react-native-wagmi-charts'
import LoadingSign from './LoadingSign'
import FilterComponent from './FilterComponent'

interface ModalProps {
  isVisible: boolean
  closeModal: () => void
  coin: Coin | null
}

const filterDaysArray = [
  { filterDay: '1', filterText: '24h' },
  { filterDay: '7', filterText: '7d' },
  { filterDay: '30', filterText: '30d' },
  { filterDay: '365', filterText: '1y' },
  { filterDay: 'max', filterText: 'All' },
]

function CoinModal({ isVisible, closeModal, coin }: ModalProps) {
  //render only if modal is visible (isVisible). Stops the modal from rendering in other components when it's not visible.
  if (!isVisible) {
    return null
  }
  const watchlistCtx = useContext(WatchlistContext)
  const [snackAddVisible, setSnackAddVisible] = useState(false)
  const [snackRemoveVisible, setSnackRemoveVisible] = useState(false)
  const [coinCandleChartData, setCoinCandleChartData] = useState<
    any[] | null | undefined
  >(null)
  const [selectedRange, setSelectedRange] = useState('1')
  const [errFetch, setErrFetch] = useState(false)

  const screenWidth = Dimensions.get('window').width
  let favoriteIcon = 'heart-outline'
  if (coin) {
    if (watchlistCtx.isInWatchlist(coin)) {
      favoriteIcon = 'heart'
    } else {
      favoriteIcon = 'heart-outline'
    }
  }

  function toggleWatchlist() {
    //Add coin to watchlist (also remove if already in watchlist)
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

  const fetchCandleStickChartData = async (selectedRangeValue: number) => {
    if (!coin) return
    const fetchedSelectedCandleChartData = await getCandleChartData(
      coin.name,
      selectedRangeValue
    )
    setCoinCandleChartData(fetchedSelectedCandleChartData)
    setErrFetch(false)

    if (!fetchedSelectedCandleChartData) {
      setCoinCandleChartData([])
      setErrFetch(true)
    }
  }

  const onSelectedRangeChange = useCallback((selectedRangeValue: string) => {
    setSelectedRange(selectedRangeValue)
    fetchCandleStickChartData(parseInt(selectedRangeValue))
  }, [])

  useEffect(() => {
    //Fetch candlestick chart data for 1 day as default when modal is opened
    fetchCandleStickChartData(1)
  }, [])

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
                    color: coin
                      ? coin.priceChange >= 0
                        ? 'rgb(96, 255, 123)'
                        : 'rgb(255, 88, 88)'
                      : 'white',
                    fontSize: 16,
                  }}
                >
                  {coin
                    ? coin.priceChange >= 0
                      ? '+' + coin?.priceChange + '% today'
                      : coin?.priceChange + '% today'
                    : ''}
                </Text>
              </View>
              <View style={styles.filtersContainer}>
                {filterDaysArray.map((day) => (
                  <FilterComponent
                    filterDay={day.filterDay}
                    filterText={day.filterText}
                    selectedRange={selectedRange}
                    setSelectedRange={onSelectedRangeChange}
                    key={day.filterText}
                  />
                ))}
              </View>
              {coinCandleChartData && (
                <GestureHandlerRootView>
                  <CandlestickChart.Provider
                    data={coinCandleChartData.map(
                      ([timestamp, open, high, low, close]: any) => ({
                        timestamp,
                        open,
                        high,
                        low,
                        close,
                      })
                    )}
                  >
                    <CandlestickChart
                      height={screenWidth - 20}
                      width={screenWidth}
                    >
                      <CandlestickChart.Candles />
                      <CandlestickChart.Crosshair>
                        <CandlestickChart.Tooltip
                          textStyle={{
                            color: 'white',
                          }}
                        />
                      </CandlestickChart.Crosshair>
                    </CandlestickChart>
                    <View style={styles.candleStickDataContainer}>
                      <View>
                        <Text style={styles.candleStickTextLabel}>Open</Text>
                        <CandlestickChart.PriceText
                          style={styles.candleStickText}
                          type='open'
                        />
                      </View>
                      <View>
                        <Text style={styles.candleStickTextLabel}>High</Text>
                        <CandlestickChart.PriceText
                          style={styles.candleStickText}
                          type='high'
                        />
                      </View>
                      <View>
                        <Text style={styles.candleStickTextLabel}>Low</Text>
                        <CandlestickChart.PriceText
                          style={styles.candleStickText}
                          type='low'
                        />
                      </View>
                      <View>
                        <Text style={styles.candleStickTextLabel}>Close</Text>
                        <CandlestickChart.PriceText
                          style={styles.candleStickText}
                          type='close'
                        />
                      </View>
                    </View>
                    <CandlestickChart.DatetimeText
                      style={{ color: 'white', fontWeight: '700', margin: 10 }}
                    />
                  </CandlestickChart.Provider>
                </GestureHandlerRootView>
              )}
              {!coinCandleChartData && (
                <View style={{ marginTop: 30 }}>
                  <LoadingSign message='Chart opening...'></LoadingSign>
                </View>
              )}
            </ScrollView>
            {errFetch && (
              <View style={{ marginBottom: 350 }}>
                <Text style={styles.errorText}>
                  There seems to be no chart data available for this coin or
                  option.
                </Text>
              </View>
            )}
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
    height: '93%',
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
  candleStickText: {
    color: 'white',
    fontWeight: '700',
  },
  candleStickDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  candleStickTextLabel: {
    color: 'grey',
    fontSize: 13,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3e334b',
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 5,
  },
})

export default React.memo(CoinModal)
