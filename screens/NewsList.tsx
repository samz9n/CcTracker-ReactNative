import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { News } from '../types/types'
import LoadingSign from '../components/ui/LoadingSign'
import { getCoinDeskNews, getCoinTelegraphNews } from '../util/newsRest'
import ListSeparator from '../components/ui/ListSeparator'
import NewsListButton from '../components/ui/NewsListButton'

export default function NewsList() {
  const [coinDeskNews, setCoinDeskNews] = useState<News[]>([])
  const [coinTelegraphNews, setCoinTelegraphNews] = useState<News[]>([])
  const [selectedTab, setSelectedTab] = useState('CoinDesk')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getNews() {
      setIsLoading(true)
      const cdNews = await getCoinDeskNews()
      setCoinDeskNews(cdNews)
      const ctNews = await getCoinTelegraphNews()
      setCoinTelegraphNews(ctNews)
      setIsLoading(false)
    }
    getNews()
  }, [])

  const handlePressCoinDesk = () => {
    setSelectedTab('CoinDesk')
  }

  const handlePressCoinTelegraph = () => {
    setSelectedTab('CoinTelegraph')
  }

  const openUrl = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log('Dont know how to open url: ' + url)
      }
    })
  }

  const renderTabButton = (title: string, onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 40,
        backgroundColor: selectedTab === title ? 'white' : 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  )

  const renderHeader = () => (
    <View style={{ flexDirection: 'row' }}>
      {renderTabButton('CoinDesk', handlePressCoinDesk)}
      {renderTabButton('CoinTelegraph', handlePressCoinTelegraph)}
    </View>
  )

  const renderItem = ({ item }: { item: News }) => {
    return (
      <NewsListButton
        onPress={() => openUrl(item.url)}
        title={item.title}
        desciption={item.description}
        date={item.date}
        url={item.url}
      />
    )
  }

  const renderData = () => {
    if (selectedTab === 'CoinDesk') {
      return (
        <FlatList
          data={coinDeskNews}
          renderItem={renderItem}
          ItemSeparatorComponent={ListSeparator}
        />
      )
    } else {
      return (
        <FlatList
          data={coinTelegraphNews}
          renderItem={renderItem}
          ItemSeparatorComponent={ListSeparator}
        />
      )
    }
  }

  if (isLoading) return <LoadingSign message='Fetching news...' />

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      {renderData()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(13, 0, 24)',
  },
})
