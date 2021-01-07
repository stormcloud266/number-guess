import React, { ReactElement, ReactNode } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'

interface Props {
  title: string | ReactNode
  onPress: () => void
  secondary?: boolean
}

const MainButton = ({ title, secondary, onPress }: Props): ReactElement => {
  const buttonBg = secondary
    ? { ...styles.button, ...styles.secondary }
    : styles.button

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={buttonBg}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default MainButton
