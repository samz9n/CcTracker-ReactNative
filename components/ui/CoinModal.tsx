import React, { useState } from 'react'
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Coin } from '../../types/types'

interface ModalProps {
  isVisible: boolean
  closeModal: () => void
  coin: Coin | null
}

const CoinModal = ({ isVisible, closeModal, coin }: ModalProps) => {
  return (
    <GestureRecognizer style={{ flex: 1 }} onSwipeDown={closeModal}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Ionicons name='close' size={25} color='white' />
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.coinTxt}>Name: {coin?.name}</Text>
              <Text style={styles.coinTxt}>Symbol: {coin?.symbol}</Text>
              <Text style={styles.coinTxt}>Price: {coin?.price}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgb(14, 1, 41)',
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
    top: 8,
    right: 8,
  },
  coinTxt: {
    fontSize: 20,
    color: 'white',
  },
})

export default CoinModal
