import React, { ReactElement } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/colors'
import Title from './Title'

interface Props {
  title: string
}

const Header = ({ title }: Props): ReactElement => {
  return (
    <View style={styles.header}>
      <Title style={styles.title}>{title}</Title>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderBottomWidth: Platform.OS === 'android' ? 0 : 1,
  },
  title: {
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
})

export default Header
