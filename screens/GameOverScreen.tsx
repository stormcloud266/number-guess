import React, { ReactElement } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

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
      <Text>The game is over!</Text>
      <Text>Number of rounds: {rounds}</Text>
      <Text>Number was: {userNumber}</Text>
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
