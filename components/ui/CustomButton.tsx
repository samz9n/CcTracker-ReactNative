import { View, Text, ViewStyle, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
  onPress: () => void
  children: string
  style?: ViewStyle | ViewStyle[]
  disabled?: boolean
}
/* CUSTOM BUTTON COMPONENT THAT LOOKS THE SAME ON ANDROID AND IOS. */
export default function CustomButton({
  onPress,
  children,
  style,
  disabled,
}: Props) {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        //if the button is disabled, the color will be grey
        //when pressed, the button will be a little bit lighter, otherwise go with the default style
        style={({ pressed }) => {
          if (disabled) {
            return [styles.disabledBtn]
          } else {
            return pressed
              ? [styles.btnInnerContainer, styles.pressed]
              : styles.btnInnerContainer
          }
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={disabled ? styles.disabledBtnText : styles.btnText}>
          {children}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 8,
    margin: 4,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  btnInnerContainer: {
    backgroundColor: '#72063c',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  disabledBtn: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  disabledBtnText: {
    color: 'rgb(124, 123, 123)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
})
