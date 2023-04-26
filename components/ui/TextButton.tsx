import { Pressable, StyleSheet, Text, View } from 'react-native'

interface TextButtonProps {
  children: string
  onPress: () => void
}
//Custom button for the login and signup screen (same look for android and ios)
export default function TextButton({ children, onPress }: TextButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: '#77ccf3',
    fontWeight: 'bold',
  },
})
