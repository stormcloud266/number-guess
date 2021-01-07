import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Header from './components/Header'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

/*
expo install expo-app-loading
import AppLoading from 'expo-app-loading'
*/

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>()
  const [guessRounds, setGuessRounds] = useState<number>(0)

  const startGameHandler = (selectedNumber: number | undefined) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const newGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(undefined)
  }

  const gameOverHandler = (numberOfRounds: number) => {
    setGuessRounds(numberOfRounds)
  }

  let content = <StartScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={setGuessRounds} />
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        rounds={guessRounds}
        userNumber={userNumber}
        startNewGame={newGameHandler}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
