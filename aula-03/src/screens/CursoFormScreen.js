import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { addCurso, updateCurso } from '../services/CursoService'

const CursoFormScreen = ({ route, navigation }) => {

    const itemId = route.params?.itemId
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [editing, setediting] = useState(false)

    useEffect(() => {
        if (itemId) {
            const buscarCurso = async () => {
                const docRef = doc(db, 'cursos', itemId)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setName(docSnap.data().name)
                    setDescription(docSnap.data().description)
                    setediting(true)
                }
            }
            buscarCurso()
        }
    }, [itemId])

    const handleSubmit = async () => {
        console.log('Dados do curso:', { itemId, name, description, editing })

        if (!name || !description) {
            Alert.alert("Erro", "Preencha todos os campos")
            return
        }

        const cursoData = {
            name: name.trim(),
            description: description.trim()
        }

        console.log('Payload enviado:', JSON.stringify(cursoData, null, 2))

        try {
            if (editing) {
                console.log('Tentando atualizar curso ID:', itemId)
                await updateCurso(itemId, cursoData)
                Alert.alert("Sucesso", "Curso atualizado com sucesso")
                navigation.navigate('Details', {
                    itemId: itemId,
                    name: cursoData.name,
                    description: cursoData.description
                })
            } else {
                await addCurso(cursoData)
                Alert.alert("Sucesso", "Curso adicionado com sucesso")
                navigation.replace('Main')
            }
        } catch (error) {
            console.error("Erro ao salvar o curso:", error)
            Alert.alert(
                "Erro",
                `Ocorreu um erro ao salvar o curso`
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {editing ? 'Editar Curso' : 'Adicionar Curso'}
            </Text>

            <TextInput
                placeholder="Nome do curso"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Descrição"
                style={[styles.input, styles.multilineInput]}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
            />

            <Button
                title={editing ? "Atualizar" : "Salvar"}
                onPress={handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderBottomWidth: 1, marginBottom: 20, padding: 8 },
})

export default CursoFormScreen