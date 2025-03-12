import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Linking, Dimensions, Animated
} from 'react-native';

const { width } = Dimensions.get('window');

const CartaoApresentacao = ({ nome, cargo, descricao, hobbies, imagem, github, linkedin }) => {

  const [detalhesVisiveis, setDetalhesVisiveis] = useState(false);
  const alturaAnimada = useRef(new Animated.Value(0)).current;

  const alternarDetalhes = () => {
    if (detalhesVisiveis) {
      Animated.timing(alturaAnimada, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDetalhesVisiveis(false));
    } else {
      setDetalhesVisiveis(true);
      Animated.timing(alturaAnimada, {
        toValue: 80,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const abrirLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.cargo}>{cargo}</Text>

      { }
      <Animated.View style={[styles.detalhesContainer, { height: alturaAnimada }]}>
        {detalhesVisiveis && (
          <>
            <Text style={styles.descricao}>{descricao}</Text>
            <Text style={styles.hobbies}><Text style={styles.negrito}>Hobbies:</Text> {hobbies}</Text>
          </>
        )}
      </Animated.View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, styles.botaoVerMais]} onPress={alternarDetalhes}>
          <Text style={styles.textoBotao}>{detalhesVisiveis ? "Ver Menos" : "Ver Mais"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoGithub]} onPress={() => abrirLink(github)}>
          <Text style={styles.textoBotao}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoLinkedin]} onPress={() => abrirLink(linkedin)}>
          <Text style={styles.textoBotao}>LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10,
    alignSelf: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cargo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  detalhesContainer: {
    overflow: 'hidden',
    width: '100%',
    marginTop: 10,
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  hobbies: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  negrito: {
    fontWeight: 'bold',
    color: '#000',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'nowrap',
    marginTop: 15,
    width: '85%',
  },
  botao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  botaoVerMais: {
    backgroundColor: '#28a745',
  },
  botaoGithub: {
    backgroundColor: '#333',
  },
  botaoLinkedin: {
    backgroundColor: '#0077b5',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartaoApresentacao;
