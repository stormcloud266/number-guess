import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import Header from './components/Header'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>()
  const [guessRounds, setGuessRounds] = useState<number>(0)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

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
