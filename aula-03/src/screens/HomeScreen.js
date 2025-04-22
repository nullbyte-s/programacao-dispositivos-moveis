import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCursos, deleteCurso } from '../services/CursoService'

const HomeScreen = ({ navigation }) => {
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        loadCursos()
    }, [])

    const loadCursos = async () => {
        const cursosData = await getCursos()
        setCursos(cursosData)
    }

    const handleDelete = async (id) => {
        Alert.alert(
            "Confirmar",
            "Deseja realmente excluir este curso?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        await deleteCurso(id)
                        loadCursos()
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📚 Cursos Disponíveis</Text>

            <FlatList
                data={cursos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Details', {
                            itemId: item.id,
                            name: item.name,
                            description: item.description
                        })}
                        onLongPress={() => handleDelete(item.id)}
                    >
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddCurso')}
            >
                <Text style={styles.addButtonText}>+ Adicionar Curso</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2
    },
    itemTitle: { fontSize: 18, fontWeight: 'bold' },
    itemDescription: { fontSize: 14, color: '#555' },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 8,
        marginTop: 10
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default HomeScreen
