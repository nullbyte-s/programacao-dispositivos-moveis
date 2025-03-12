import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CartaoApresentacao from './src/components/CartaoApresentacao';

const App = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CartaoApresentacao
          nome="John Doe"
          cargo="Desenvolvedor Mobile"
          descricao="Apaixonado por tecnologia e inovação. Experiência em desenvolvimento de aplicativos para plataformas Android e iOS."
          hobbies="♟ Jogar xadrez, 📚 ler livros de programação, ✈ viajar."
          imagem="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
          github="https://github.com/johndoe"
          linkedin="https://linkedin.com/in/johndoe"
        />

        <CartaoApresentacao
          nome="Joana d'Arc"
          cargo="Designer UX/UI"
          descricao="Criativa e focada em soluções centradas no usuário. Experiência em design de interfaces e protótipos."
          hobbies="✍ Desenhar, 🎻tocar violino, 🍿 maratonar séries."
          imagem="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHpIBDNJ1N8ksL5iAUCTpkRVpFXBj9AdvrwFZndJdN9tETQZ2LWuhCDCCZCPE07DuzHhE&usqp=CAU"
          github="https://github.com/joanadarc"
          linkedin="https://linkedin.com/in/joanadarc"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default App;
