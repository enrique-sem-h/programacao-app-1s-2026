import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Alert,
  Pressable,
  Modal, 
  ScrollView, 
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

function alert(message: string) {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

function MeuCardNoticia({ aoClicar }: any) {
  return (
    <Pressable style={styles.cardContainer} onPress={aoClicar}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTag}>TECNOLOGIA</Text>
      </View>
      <Text style={styles.cardTitulo}>AWS chegou na Catolica</Text>
      <Text style={styles.cardResumo}>
        Novas parcerias trazem cursos da AWS para alunos de TI...
      </Text>
      <Text style={styles.cardBotaoTexto}>Ler notícia completa →</Text>
    </Pressable>
  );
}

export default function Home({ navigation }: any) {
  const [remind, setRemind] = useState<boolean>(false);
  const remindToggle = () => setRemind((prev) => !prev);

  const [modalVisible, setModalVisible] = useState(false);
  const [conteudoNoticia, setConteudoNoticia] = useState({ titulo: "", texto: "" });

  const abrirNoticia = () => {
    setConteudoNoticia({
      titulo: "AWS chegou na Catolica",
      texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    });
    setModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.detailTitle}>{conteudoNoticia.titulo}</Text>
                <Text style={styles.detailText}>{conteudoNoticia.texto}</Text>
                
                <View style={styles.modalButtons}>
                  <Button 
                    title="Ir para Comentários" 
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("Leitor"); 
                    }} 
                    color="#50c878"
                  />
                  <View style={{ height: 10 }} />
                  <Button title="Fechar" onPress={() => setModalVisible(false)} color="#ff4757" />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Text style={styles.text_title}>Home!</Text>
        
        <View style={styles.horizontal_view}>
          <Button
            title="Cadastro"
            onPress={() => navigation.navigate("Register")}
          />
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            onPress={() => {
              remindToggle();
              alert(remind ? "lembrete desativado" : "Você será lembrado!");
            }}
          >
            <Feather
              name={remind ? "bell" : "bell-off"}
              size={28}
              color="blue"
            />
          </Pressable>
        </View>

        <TextInput
          style={styles.textInput_base}
          placeholder="Buscar noticias (por tag ou UF)"
        />

        <MeuCardNoticia aoClicar={abrirNoticia} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  horizontal_view: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
    marginVertical: 10
  },
  text_title: {
    fontWeight: "900",
    fontSize: 32,
    marginTop: 10
  },
  textInput_base: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  cardContainer: {
    width: '90%',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 },
  cardTag: { fontSize: 10, fontWeight: 'bold', color: '#4a90e2' },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardResumo: { fontSize: 14, color: '#666', marginTop: 5 },
  cardBotaoTexto: { color: 'blue', marginTop: 10, fontWeight: 'bold', fontSize: 12 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  detailTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  detailText: { fontSize: 16, color: '#333', lineHeight: 22 },
  modalButtons: { marginTop: 20 }
});