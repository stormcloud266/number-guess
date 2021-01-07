import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import Body from './Body'

interface Props {
  selectedNumber: number | undefined
}

const NumberContainer = ({ selectedNumber }: Props): ReactElement => {
  return (
    <View style={styles.container}>
      <Body style={styles.number}>{selectedNumber}</Body>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: Colors.primary,
    fontSize: 22,
  },
})

export default NumberContainer
