import React, { ReactElement, useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Body from '../components/Body'
import MainButton from '../components/MainButton'

interface Props {
  userChoice: number
  onGameOver: (rounds: number) => void
}

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNum = Math.floor(Math.random() * (max - min)) + min

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return randomNum
  }
}

const GameScreen = ({ userChoice, onGameOver }: Props): ReactElement => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  )
  const [rounds, setRounds] = useState<number>(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert('Hey! No cheating.', 'Please select the real hint.', [
        { text: 'I repent', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setRounds((curRounds) => ++curRounds)
    setCurrentGuess(nextNumber)
  }

  return (
    <View style={styles.container}>
      <Body>Opponent's Guess</Body>
      <NumberContainer selectedNumber={currentGuess} />
      <Card style={styles.buttonContainer}>
        <MainButton
          title={<Ionicons name="md-remove" size={24} color="white" />}
          secondary
          onPress={nextGuessHandler.bind(this, 'lower')}
        />
        <MainButton
          title={<Ionicons name="md-add" size={24} color="white" />}
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 330,
    maxWidth: '80%',
  },
})

export default GameScreen
