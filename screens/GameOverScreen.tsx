import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Body from '../components/Body'
import Title from '../components/Title'
import MainButton from '../components/MainButton'
import Colors from '../constants/colors'

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
      <Title>The Game Is Over!</Title>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/success.png')} style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
        <Body style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}.</Text>
        </Body>
      </View>
      <MainButton title="Play Again" onPress={startNewGame} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
})

export default GameOverScreen
