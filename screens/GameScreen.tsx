import React, { ReactElement, useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Alert, Dimensions, FlatList } from 'react-native'
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

const renderListItem = (listLength: number, itemData: any) => (
  <View style={styles.listItem}>
    <Body>#{listLength - itemData.index}</Body>
    <Body>{itemData.item}</Body>
  </View>
)

const GameScreen = ({ userChoice, onGameOver }: Props): ReactElement => {
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guesses, setGuesses] = useState<number[]>([initialGuess])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert('Hey! No cheating.', 'Please select the real hint.', [
        { text: 'Okay!', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setGuesses((prevGuesses) => [nextNumber, ...prevGuesses])
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
      <View style={styles.list}>
        {/* <ScrollView>
          {guesses.map((guess, i) => renderListItem(guess, guesses.length - i))}
        </ScrollView> */}
        <FlatList
          data={guesses}
          keyExtractor={(item) => item.toString()}
          renderItem={renderListItem.bind(this, guesses.length)}
        />
      </View>
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    marginBottom: 20,
    width: 330,
    maxWidth: '80%',
  },
  list: {
    width: '80%',
    flex: 1,
  },
  listItem: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default GameScreen
