// Implementar um componente Counter que exibe um número (inicialmente 0) e dois botões para incrementar e decrementar o valor. Utilize o hook useState.

import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'

const Exercicio2 = () => {

    const [contador, setContador] = useState(0)

    function incrementar() {
        setContador(contador+1)
    }

    function decrementar(){
        setContador(contador-1)
    }

  return (
    <View style={styles.container}>
      <Button title="Incrementar" onPress={incrementar} />
      <Text style={styles.text}>O contador está em: {contador}</Text>
      <Button title="Decrementar" onPress={decrementar} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    top: 300
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});

export default Exercicio2;