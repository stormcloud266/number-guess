import React, { ReactElement } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import Body from '../components/Body'

interface Props {
  rounds: number
  userNumber: number | undefined
  startNewGame: () => void
}

const GameOverScreen = ({
  rounds,
  userNumber,
  startNewGame,
}: Props): ReactElement => {
  return (
    <View style={styles.container}>
      <Body>The game is over!</Body>
      <Body>Number of rounds: {rounds}</Body>
      <Body>Number was: {userNumber}</Body>
      <Button title="Play Again" onPress={startNewGame} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GameOverScreen
