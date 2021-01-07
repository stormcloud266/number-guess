import React, { ReactElement } from 'react'
import { TextInput, StyleSheet, TextInputProps, TextStyle } from 'react-native'

const Input = (props: TextInputProps): ReactElement => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...(props.style as TextStyle) }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
    fontFamily: 'open-sans',
  },
})

export default Input
