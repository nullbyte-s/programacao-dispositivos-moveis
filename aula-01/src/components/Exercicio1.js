// Criar um componente funcional que aceita um nome como prop e exibe uma mensagem de saudação.

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Exercicio1 = ({nome}) => {
  return (
    <View style={styles.container}>
      <Text>Olá, {nome}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        padding:100
    }
})

export default Exercicio1