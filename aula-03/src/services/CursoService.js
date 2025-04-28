import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const cursosRef = collection(db, 'cursos')

// CREATE: Adicionar novo curso
export const addCurso = async (cursoData) => {
    try {
        const docRef = await addDoc(cursosRef, cursoData)
        return docRef.id
    } catch (error) {
        console.error("Erro ao adicionar curso: ", error)
        throw error
    }
}

// READ: Buscar todos os cursos
export const getCursos = async () => {
    const snapshot = await getDocs(cursosRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// READ: Obter um curso específico por ID
export const getCursoById = async (id) => {
    const docRef = doc(db, 'cursos', id)
    const snapshot = await getDocs(docRef)
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

// UPDATE: Atualizar um curso
export const updateCurso = async (id, novosDados) => {
    try {
        const cursoRef = doc(db, 'cursos', id)
        await updateDoc(cursoRef, novosDados)
    } catch (error) {
        console.error('Erro ao atualizar curso:', error)
        throw new Error(`Falha na atualização: ${error.message}`)
    }
}

// DELETE: Remover um curso
export const deleteCurso = async (id) => {
    const cursoRef = doc(db, 'cursos', id)
    try {
        await deleteDoc(cursoRef)
    } catch (error) {
        console.error("Erro ao deletar curso: ", error)
        throw error
    }
}