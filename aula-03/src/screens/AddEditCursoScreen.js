import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { addCurso, updateCurso } from '../services/CursoService'

const AddEditCursoScreen = ({ navigation, route }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [cursoId, setCursoId] = useState(null)

    useEffect(() => {
        if (route.params?.curso) {
            const { id, name, description } = route.params.curso
            setName(name)
            setDescription(description)
            setCursoId(id)
            setIsEditing(true)
        }
    }, [route.params])

    const handleSubmit = async () => {
        console.log('Dados do curso:', { cursoId, name, description, isEditing })

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
            if (isEditing) {
                console.log('Tentando atualizar curso ID:', cursoId)
                await updateCurso(cursoId, cursoData)
                Alert.alert("Sucesso", "Curso atualizado com sucesso")
                navigation.navigate('Details', {
                    itemId: cursoId,
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
                {isEditing ? 'Editar Curso' : 'Adicionar Curso'}
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
                title={isEditing ? "Atualizar" : "Salvar"}
                onPress={handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top'
    }
})

export default AddEditCursoScreen