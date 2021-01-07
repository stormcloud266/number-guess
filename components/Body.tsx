import React, { ReactElement, ReactNode } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

interface Props {
  children: ReactNode
  style?: TextStyle
}

const Body = ({ children, style }: Props): ReactElement => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
})

export default Body
