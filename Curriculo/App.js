import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native'; 
import { FontAwesome } from '@expo/vector-icons';
// Página Inicial
const PaginaInicial = () => {

    const abrirLinkedin = () => {
      Linking.openURL('www.linkedin.com/in/isarthursilveira');
    };
  
    const abrirGithub = () => {
      Linking.openURL('https://github.com/IsArthurSilveira');
    };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pagina}>
        <Image
           source={require('./assets/foto-do-perfil.jpg')}
           style={styles.image} />
        <View style={styles.box}>
          <Text style={styles.titulo}>Olá, eu sou a Arthur Silveira!</Text>
          <Text style={styles.texto}>Sou um desenvolvedor full stack e também curto muito o mundo do Design!</Text>
          <Text style={styles.texto}>Quer saber mais sobre mim? Te convido a explorar esse aplicativo que construi</Text>
          <Text style={styles.titulo}>Vamos nos conectar!</Text>


          <TouchableOpacity onPress={abrirGithub} style={styles.botao}>
            <FontAwesome name="github" size={24} color="#084395ff" />
            <Text style={styles.botaoTexto}>GitHub</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={abrirLinkedin} style={styles.botao}>
            <FontAwesome name="linkedin" size={24} color="#084395ff" />
            <Text style={styles.botaoTexto}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Página Sobre Mim
const Pagina1 = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pagina}>
        <View style={styles.box}>
          <Text style={styles.titulo}>Sobre Mim</Text>
          <Text style={styles.texto}>
            Eu sou Arthur Silveira, mas você pode me chamar apenas por Arthur. Tenho 21 anos e amo jogos, séries, filmes e ouvir música de todos os gêneros. Adoro criar, desenhar e posso dizer que sou um entusiasta por tecnologia e design.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

//Página Formação e Cursos
const Pagina2 = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pagina}>
        <View style={styles.box}>
          <Text style={styles.titulo}>Formação</Text>
          <Text style={styles.texto}>
            Graduando em Análise e Desenvolvimento de Sistemas na Faculdade SENAC Pernambuco. Tenho por objetivo desenvolver projetos integrando tecnologia e educação.
          </Text>
          <Text style={styles.texto}>
            Tenho interesses em diversas áreas, seja em desenvolvimento full stack, ui/ux e até mesmo em gestão de projetos
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Pagina3 = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pagina}>
        <View style={styles.box}>
          <Text style={styles.titulo}>Projetos</Text>
          <Text style={styles.texto}>CH1C0 - Rec N Play</Text>
          <Text style={styles.texto}>Ch1c0 sabido</Text>
          <Text style={styles.texto}>Chico no Clima</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Pagina4 = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pagina}>
        <View style={styles.box}>
          <Text style={styles.titulo}>Habilidades</Text>
          <Text style={styles.texto}>Habilidades que adquiri ao longo do curso de Análise e Desenvolvimento de Sistemas</Text>
          <Text style={styles.titulo}>Hard Skills</Text>
          <Text style={styles.texto}>HTML5</Text>
          <Text style={styles.texto}>CSS3</Text>
          <Text style={styles.texto}>JavaScript</Text>
          <Text style={styles.texto}>MySQL</Text>
          <Text style={styles.texto}>Linguagem Python</Text>
          <Text style={styles.texto}>Figma</Text>
          <Text style={styles.texto}>Canva</Text>
          <Text style={styles.texto}>Metodologia Scrum</Text>
          <Text style={styles.texto}>Trello</Text>
          <Text style={styles.titulo}>Soft Skills</Text>
          <Text style={styles.texto}>Trabalho em equipe</Text>
          <Text style={styles.texto}>Comunicação</Text>
          <Text style={styles.texto}>Organização</Text>
          <Text style={styles.texto}>Criatividade</Text>
          <Text style={styles.texto}>Liderança</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const App = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState('Página Inicial');

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const navegarPara = (pagina) => {
    setPaginaAtual(pagina);
    setMenuAberto(false);
  };

  // Renderização condicional da página atual
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'Página Inicial':
        return <PaginaInicial />;
      case 'Página 1':
        return <Pagina1 />;
      case 'Página 2':
        return <Pagina2 />;
      case 'Página 3':
        return <Pagina3 />;
      case 'Página 4':
        return <Pagina4 />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Currículo: Arthur Silveira</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {menuAberto && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página Inicial')}>
            <Text style={styles.menuItemText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página 1')}>
            <Text style={styles.menuItemText}>Sobre Mim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página 2')}>
            <Text style={styles.menuItemText}>Formação e Cursos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página 3')}>
            <Text style={styles.menuItemText}>Projetos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página 4')}>
            <Text style={styles.menuItemText}>Habilidades</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Conteúdo */}
      <View style={styles.content}>{renderizarPagina()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeb8e8ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#13517aff',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 15,
  },
  menu: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FDE7F5',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  pagina: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#2982d5ff',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '90%',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#277d95ff',
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    color: '#37002b',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d0d4fbff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  botaoTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  image:{
    width:150,
    height:150,
    borderRadius:30,
    borderColor: '#fff',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
