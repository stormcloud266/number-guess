import React, { ReactElement } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface Props {
  children: JSX.Element | JSX.Element[]
  style?: ViewStyle
}

const Card = ({ children, style }: Props): ReactElement => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
})

export default Card
