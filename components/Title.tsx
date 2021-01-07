import React, { ReactElement, ReactNode } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

interface Props {
  children: ReactNode
  style?: TextStyle
}

const Title = ({ children, style }: Props): ReactElement => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
})

export default Title
