import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const cursosRef = collection(db, 'cursos')

export const addCurso = async (cursoData) => {
    try {
        const docRef = await addDoc(cursosRef, cursoData)
        return { id: docRef.id, ...cursoData }
    } catch (error) {
        console.error("Erro ao adicionar curso: ", error)
        throw error
    }
}

export const getCursos = async () => {
    const snapshot = await getDocs(cursosRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getCursoById = async (id) => {
    const docRef = doc(db, 'cursos', id)
    const snapshot = await getDoc(docRef)
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export const updateCurso = async (id, updateData) => {
    try {
        const sanitizedData = {
            name: String(updateData.name),
            description: String(updateData.description)
        }

        const cursoRef = doc(db, 'cursos', String(id))
        await updateDoc(cursoRef, sanitizedData)
        return { id, ...sanitizedData }
    } catch (error) {
        console.error('Erro ao atualizar curso:', error)
        throw new Error(`Falha na atualização: ${error.message}`)
    }
}

export const deleteCurso = async (id) => {
    const docRef = doc(db, 'cursos', id)
    try {
        await deleteDoc(docRef)
        return id
    } catch (error) {
        console.error("Erro ao deletar curso: ", error)
        throw error
    }
}