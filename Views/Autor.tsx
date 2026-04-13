import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

export default function Autor() {
  const [telaAtual, setTelaAtual] = useState<"perfil" | "lista" | "formulario">(
    "perfil",
  );
  const [modoEdicao, setModoEdicao] = useState(false);

  const TelaPerfil = () => (
    <View style={styles.content}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>M</Text>
      </View>
      <Text style={styles.profileName}>Mariana</Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setTelaAtual("lista")}
      >
        <Text style={styles.menuItemText}>Ver Minhas Noticias</Text>
      </TouchableOpacity>
    </View>
  );

  const TelaLista = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setTelaAtual("perfil")}
      >
        <Text>← Voltar ao Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModoEdicao(false);
          setTelaAtual("formulario");
        }}
      >
        <Text style={styles.buttonText}>+ Nova Noticia</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AWS chegou na catolica</Text>
        <TouchableOpacity
          onPress={() => {
            setModoEdicao(true);
            setTelaAtual("formulario");
          }}
        >
          <Text style={styles.editLink}>Editar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const TelaFormulario = () => (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setTelaAtual("lista")}
      >
        <Text>← Cancelar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>
        {modoEdicao ? "Editar Noticia" : "Nova Noticia"}
      </Text>

      <TextInput style={styles.input} placeholder="Titulo da noticia" />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Conteudo..."
        multiline
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          Alert.alert("Sucesso", modoEdicao ? "Atualizado!" : "Criado!");
          setTelaAtual("lista");
        }}
      >
        <Text style={styles.buttonText}>
          {modoEdicao ? "Salvar Alterações" : "Publicar"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {telaAtual === "perfil" && <TelaPerfil />}
      {telaAtual === "lista" && <TelaLista />}
      {telaAtual === "formulario" && <TelaFormulario />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4a90e2",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  menuItemText: { fontWeight: "bold", color: "#4a90e2" },
  backBtn: { marginBottom: 20 },
  addButton: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#50c878",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: { fontWeight: "bold" },
  editLink: { color: "#4a90e2", fontWeight: "bold" },
  input: {
    backgroundColor: "#fff",
    borderWeight: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
