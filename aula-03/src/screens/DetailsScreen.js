import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'

const DetailsScreen = ({ navigation, route }) => {
  const { itemId, name, description } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Detalhes do Curso</Text>
      <Text style={styles.itemTitle}>{name}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
      <Text style={styles.itemId}>ID: {itemId}</Text>

      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditCurso', {
          curso: { id: itemId, name, description }
        })}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  itemId: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default DetailsScreen