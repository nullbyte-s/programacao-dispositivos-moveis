
# Aula 03 - App de Gestão de Cursos em React Native

Este projeto demonstra uma aplicação mobile desenvolvida em **React Native** (via **Expo**) de gerenciamento de cursos, na qual o usuário pode cadastrar, listar, editar e excluir cursos armazenados em um banco de dados NoSQL em nuvem (Firestore Database). A aplicação também simula um fluxo básico de autenticação com navegação protegida (a autenticação real será implementada futuramente). A arquitetura segue boas práticas de separação de responsabilidades, uso de hooks e módulos de navegação.

---

## Índice

01. [Histórico](#histórico)
02. [Tecnologias & Bibliotecas](#tecnologias--bibliotecas)
03. [Pré‑requisitos](#pré‑requisitos)
04. [Instalação & Setup](#instalação--setup)
05. [Configuração do Firebase](#configuração-do-firebase)
06. [Estrutura do Projeto](#estrutura-do-projeto)
07. [Navegação](#navegação-appnavigation)
08. [Comandos Úteis](#comandos-úteis)
09. [Telas & Hooks](#telas--hooks)
10. [Serviço de CRUD](#serviço-de-crud-cursoservicejs)
11. [Fluxo de Uso](#fluxo-de-uso)
12. [Variáveis de Ambiente](#variáveis-de-ambiente)
13. [Scripts](#scripts-packagejson)
14. [Demonstração](#demonstração)
15. [Considerações Finais](#considerações-finais)

---

## Histórico

- [Aulas 01 e 02](https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-02/README.md)

---

## Tecnologias & Bibliotecas

- **React Native** 0.76.x  
- **Expo** ~52.x  
- **React Navigation** (Stack + Bottom Tabs)
  - `@react-navigation/native`  
  - `@react-navigation/native-stack`  
  - `@react-navigation/bottom-tabs`  
- **Firebase v11** (`firebase/app`, `firebase/firestore`)  
- **Hooks React**: `useState`, `useEffect` (manipulação de formulários)
- **dotenv** / **expo-constants** para variáveis de ambiente  
- **Vector Icons**: `@expo/vector-icons` (Ionicons, AntDesign)  

---

## Pré‑requisitos

- Node.js (>=16.x)  
- npm  
- Expo CLI instalado globalmente (`npm install -g expo-cli`)  
- Conta no Firebase com projeto Firestore ativo
- Emulador Android/iOS ou dispositivo físico com Expo Go

---

## Instalação & Setup

1. **Clone** este repositório:  
   ```bash
   git clone https://github.com/nullbyte-s/programacao-dispositivos-moveis.git
   cd programacao-dispositivos-moveis/aula-03
   ```

2. **Instale** dependências:  
   ```bash
   npm install
   ```

3. **Variáveis de ambiente**  
   - Crie `.env` na raiz, seguindo o seguinte formato:  
     ```env
     API_KEY=[API_KEY]
     AUTH_DOMAIN=[AUTH_DOMAIN]
     PROJECT_ID=[PROJECT_ID]
     STORAGE_BUCKET=[STORAGE_BUCKET]
     MESSAGING_SENDERID=[MESSAGING_SENDER_ID]
     APP_ID=[APP_ID]
     ```
   - Estas chaves são obtidas no console do Firebase (Configurações do projeto → SDK do Firebase).

4. **Configuração Expo**  
   - Em `app.config.js` já está mapeado o `process.env` para `expo.extra`.

5. **Executar emulador ou device**  
   ```bash
   npm start
   ```  
   Selecione `a` (Android), `i` (iOS), `w` (Web) ou leia o QR code no Expo Go.

---

## Configuração do Firebase / Firestore

- **firebaseConfig.js** utiliza:
  - `Constants.expoConfig.extra` (quando rodando no Expo)
  - fallback para `process.env` (em ambiente Web/CI).
- Inicializa o app:
  ```js
  import { initializeApp } from 'firebase/app'
  import { getFirestore } from 'firebase/firestore'
  import Constants from 'expo-constants'

  const {
    API_KEY, AUTH_DOMAIN, PROJECT_ID,
    STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID
  } = Constants?.expoConfig?.extra || process.env

  const firebaseConfig = { /* ... */ }
  const app = initializeApp(firebaseConfig)
  export const db = getFirestore(app)
  ```
- Note que, caso as variáveis não carreguem, um `console.error` avisa no log.

---

## Estrutura do Projeto

```
aula-03/
├── App.js                          # Entrada principal da aplicação
├── index.js                        # Entry point do app usado pelo React Native CLI
├── app.json                        # Arquivo de configuração usado pelo Expo
├── app.config.js                   # Configurações dinâmicas do Expo, incluindo carregamento de variáveis do .env
├── package.json                    # Lista de dependências, scripts de build, configurações do projeto React Native
├── .env                            # Variáveis de ambiente sensíveis
├── assets/                         # Arquivos estáticos como imagens, ícones e splash screen
│
└── src/                            # Diretório principal contendo toda a lógica da aplicação
    ├── config/
    │   └── firebaseConfig.js       # Inicializa Firebase
    │
    ├── navigation/
    │   └── AppNavigation.js       # Stack e BottomTabs
    │
    ├── screens/                   # Telas da aplicação (views), cada uma representando uma parte da UI
    │   ├── HomeScreen.js          # Tela principal com a lista de cursos (GET), permite visualizar e excluir
    │   ├── DetailsScreen.js       # Tela de detalhes de um curso específico (recebe params via navegação)
    │   ├── CursoFormScreen.js     # Tela de formulário reutilizável para adicionar ou editar cursos (POST/PUT)
    │   ├── LoginScreen.js         # Tela de login fictício com navegação condicional para a Tab principal
    │   └── ProfileScreen.js       # Tela estática exibindo informações básicas do usuário e botão de logout
    │
    └── services/
        └── CursoService.js        # Módulo de serviços para interagir com o Firestore: funções CRUD isoladas da UI
```

---

## Navegação (AppNavigation)

- **Stack Navigator** (`@react-navigation/native-stack`):
  - `Login` → tela inicial (sem `header`)
  - `Main` → Tab Navigator (Home, Profile)
  - `Details` → detalhes de um curso
  - `AddCurso` / `EditCurso` → formulário de criação/edição

- **Tab Navigator** (`@react-navigation/bottom-tabs`):
  - Aba **Home** → lista de cursos
  - Aba **Profile** → tela de perfil estático

```js
<Tab.Navigator screenOptions={{ headerShown:false }}>
  <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ... }}/>
  <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ... }}/>
</Tab.Navigator>
```

### Arquitetura

```
NavigationContainer
 └── Stack.Navigator
     ├── LoginScreen
     └── BottomTab.Navigator
         ├── HomeStack (Home, Details, Add/Edit)
         └── ProfileScreen
```

---

## Comandos Úteis

- `npm run start` : inicia Metro bundler  
- `npm run android` : abre no Android  
- `npm run ios` : abre no iOS  
- `npm run web` : executa versão web (React Native Web)  

---

## Telas & Hooks

### 1. LoginScreen.js

- **Hooks**: `useState` para `username` e `password`
- **Navegação**: no botão “Entrar” chama `navigation.replace('Main')`
- **Social Buttons**: ícones AntDesign (Google) e Ionicons (GitHub)

```jsx
<Button title="Entrar" onPress={() => navigation.replace('Main')} />
```

---

### 2. HomeScreen.js

- **Hooks**:
  - `const [cursos, setCursos] = useState([])`
  - `useEffect(() => loadCursos(), [])`
- **Carrega dados**: `getCursos()` do `CursoService`
- **FlatList** para renderizar cada curso
- **Navegação**:
  - `onPress`: `navigate('Details', { itemId, name, description })`
  - `onLongPress`: chamada de `handleDelete(id)`
- **Ação de excluir**: `Alert.alert` com confirmação → `deleteCurso(id)` → recarrega lista

---

### 3. DetailsScreen.js

- Recebe `route.params` com `{ itemId, name, description }`
- Exibe título, descrição e ID
- Botão “Editar” navega para `EditCurso`, passando o objeto `curso`
- TouchableOpacity para voltar (`navigation.goBack()`)

---

### 4. AddEditCursoScreen.js

- **Estados**: `name`, `description`, `isEditing`, `cursoId`
- **useEffect**:
  ```js
  useEffect(() => {
    if (route.params?.curso) {
      // preenche campos e aciona edição
    }
  }, [route.params])
  ```
- **handleSubmit**:
  - valida campos (Alert em branco)
  - monta `cursoData = { name, description }`
  - se `isEditing` chama `updateCurso(cursoId, cursoData)`
    - em caso de sucesso: alerta e `navigation.navigate('Details', {...})`
  - se não, chama `addCurso(cursoData)` e `navigation.replace('Main')`

---

### 5. ProfileScreen.js

- Tela estática com nome e email do usuário  
- Botão “Sair”: `navigation.replace('Login')`

---

## Serviço de CRUD (CursoService.js)

Utiliza Firestore SDK com funções assíncronas baseadas em Promises, utilizando os métodos:

```js
import {
  collection, addDoc, getDocs,
  doc, updateDoc, deleteDoc
} from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const cursosRef = collection(db, 'cursos')
```

1. **addCurso(cursoData)**  
   - `addDoc(cursosRef, cursoData)`
   - Retorna `{ id, ...cursoData }`

2. **getCursos()**  
   - `getDocs(cursosRef)`
   - Mapeia `snapshot.docs` → lista de cursos (Array)

3. **getCursoById(id)**  
   - `doc(db, 'cursos', id)` + `getDoc`
   - Retorna curso se existir

4. **updateCurso(id, updateData)**  
   - Sanitiza strings (`String(...)`)
   - `updateDoc(doc(db,'cursos',id), sanitizedData)`
   - Retorna objeto atualizado

5. **deleteCurso(id)**  
   - `deleteDoc(doc(db,'cursos',id))`
   - Retorna o `id` excluído

---

## Fluxo de Uso

1. **Login** → Tab “Home”  
2. **HomeScreen**: lista todos os cursos (GET)  
3. **Toque** em item → **DetailsScreen**  
   - “Editar” abre **AddEditCursoScreen** (modo edição)  
4. **Segure** item → confirmação de exclusão (DELETE)  
5. **Botão “+ Adicionar Curso”** em Home → **AddEditCursoScreen** (modo criar)  
   - Preenche `name` + `description` → envia (POST)  
6. Ao salvar/edit, redireciona para lista ou detalhes conforme o caso  

---

## Variáveis de Ambiente

- API_KEY  
- AUTH_DOMAIN  
- PROJECT_ID  
- STORAGE_BUCKET  
- MESSAGING_SENDERID  
- APP_ID  

Definidas em `.env` e expostas via `expo.extra` para `firebaseConfig.js`.

---

## Scripts (package.json)

| Comando     | Ação                                               |
|-------------|----------------------------------------------------|
| `start`     | Expo CLI (Metro bundler)                           |
| `android`   | Abre no emulador ou device Android                 |
| `ios`       | Abre no simulador iOS                              |
| `web`       | Executa versão web (React Native Web)              |

---

## Demonstração

<div align="center">
  <a href="https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-03/img/1.jpg" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/nullbyte-s/programacao-dispositivos-moveis/blob/main/aula-03/img/1.jpg?raw=true" alt="Exemplo 1" style="width: 256px; height: calc(256px * 16 / 10); margin: 10px;" />
  </a>
  <a href="https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-03/img/2.jpg" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/nullbyte-s/programacao-dispositivos-moveis/blob/main/aula-03/img/2.jpg?raw=true" alt="Exemplo 2" style="width: 256px; height: calc(256px * 16 / 10); margin: 10px;" />
  </a>
  <a href="https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-03/img/3.jpg" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/nullbyte-s/programacao-dispositivos-moveis/blob/main/aula-03/img/3.jpg?raw=true" alt="Exemplo 3" style="width: 256px; height: calc(256px * 16 / 10); margin: 10px;" />
  </a>
</div>

<div align="center">
  <a href="https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-03/img/4.jpg" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/nullbyte-s/programacao-dispositivos-moveis/blob/main/aula-03/img/4.jpg?raw=true" alt="Exemplo 4" style="width: 256px; height: calc(256px * 16 / 10); margin: 10px;" />
  </a>
  <a href="https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-03/img/5.jpg" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/nullbyte-s/programacao-dispositivos-moveis/blob/main/aula-03/img/5.jpg?raw=true" alt="Exemplo 5" style="width: 256px; height: calc(256px * 16 / 10); margin: 10px;" />
  </a>
  <a href="https://github.com/nullbyte-s/programacao-dispositivos-moveis/tree/main/aula-03/img/6.jpg" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/nullbyte-s/programacao-dispositivos-moveis/blob/main/aula-03/img/6.jpg?raw=true" alt="Exemplo 6" style="width: 256px; height: calc(256px * 16 / 10); margin: 10px;" />
  </a>
</div>

---

## Considerações Finais

- Código modularizado para fácil manutenção  
- Boas práticas de hooks, serviços e navegação  
- Tratamento de erros no CRUD com `try/catch` e `Alert`  
- Planos para o futuro: autenticação real com Firebase Auth, upload de imagens no Storage, cache com Redux/MobX