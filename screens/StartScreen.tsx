import React, { ReactElement, useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input'
import Body from '../components/Body'
import Title from '../components/Title'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'

interface Props {
  onStartGame: (selectedNumber: number | undefined) => void
}

const StartScreen = ({ onStartGame }: Props): ReactElement => {
  const [enteredValue, setEnteredValue] = useState<string>('')
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>()
  const [buttonWidth, setButtonWidth] = useState<number>(
    Dimensions.get('window').width / 3
  )

  useEffect(() => {
    const updateLayout = () => {
      console.log('run')
      setButtonWidth(Dimensions.get('window').width / 3)
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Number must be between 1 and 99', [
        {
          text: 'Okay',
          style: 'default',
          onPress: resetInputHandler,
        },
      ])
      return
    }

    Keyboard.dismiss()
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Body>You Selected</Body>
        <NumberContainer selectedNumber={selectedNumber} />
        <MainButton
          title="START GAME"
          onPress={() => onStartGame(selectedNumber)}
        />
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Title style={styles.title}>Start a New Game!</Title>
            <Card style={styles.inputContainer}>
              <Body>Select a Number</Body>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    ...styles.button,
                    maxWidth: buttonWidth,
                  }}
                >
                  <MainButton
                    secondary
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View
                  style={{
                    ...styles.button,
                    maxWidth: buttonWidth,
                  }}
                >
                  <MainButton title="Confirm" onPress={confirmInputHandler} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
})

export default StartScreen
