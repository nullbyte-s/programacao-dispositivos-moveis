// Criar um componente que inclui um <TextInput> para entrada de texto e um <Text> para exibir o texto digitado. Use useState para armazenar e atualizar o valor do texto.

import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Exercicio3 = () => {
	const [texto, setTexto] = useState('');

	const handleTextChange = (novoTexto) => {
		setTexto(novoTexto);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Digite algo..."
				onChangeText={handleTextChange}
				value={texto}
			/>
			<Text style={styles.text}>Você digitou: {texto}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		top: 300
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: '100%',
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	text: {
		fontSize: 18,
	},
});

export default Exercicio3;
