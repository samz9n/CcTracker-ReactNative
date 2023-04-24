import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback } from 'react'

interface NewsListButtonProps {
  onPress: () => void
  title: string
  desciption: string
  url: string
  date: string
}

function NewsListButton({
  onPress,
  title,
  desciption,
  url,
  date,
}: NewsListButtonProps) {
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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{desciption}</Text>
          <Text style={styles.url}>{date}</Text>
        </View>
      </Pressable>
    </View>
  )
}
export default React.memo(NewsListButton)

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgb(13, 0, 24)',
    height: 200,
    paddingHorizontal: 10,
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  title: {
    color: 'rgb(197, 166, 29)',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: 'rgb(216, 213, 213)',
    fontWeight: 'bold',
  },
  url: {
    color: 'rgb(216, 213, 213)',
    fontStyle: 'italic',
  },
})
