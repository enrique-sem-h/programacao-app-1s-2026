import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function Editor() {
  const [telaAtual, setTelaAtual] = useState<
    "painel" | "perfil" | "gerenciar" | "editarQualquer"
  >("painel");

  const TelaPainel = () => (
    <View style={styles.content}>
      <Text style={styles.header}>Painel do Editor</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setTelaAtual("gerenciar")}
      >
        <Text style={styles.menuItemText}>Publicar / Despublicar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setTelaAtual("editarQualquer")}
      >
        <Text style={styles.menuItemText}>Editar Qualquer Noticia</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, { marginTop: 20, borderLeftColor: "#333" }]}
        onPress={() => setTelaAtual("perfil")}
      >
        <Text style={[styles.menuItemText, { color: "#333" }]}>Meu Perfil</Text>
      </TouchableOpacity>
    </View>
  );

  const TelaPerfil = () => (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setTelaAtual("painel")}
      >
        <Text>← Voltar ao Painel</Text>
      </TouchableOpacity>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>D</Text>
      </View>
      <Text style={styles.userName}>Diego (Admin)</Text>
      <Text style={{ textAlign: "center", color: "#666" }}>
        Nivel: Administrador Senior
      </Text>
    </View>
  );

  const TelaGerenciar = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setTelaAtual("painel")}
      >
        <Text>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Moderação de Conteudo</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Noticia Pendente</Text>
        <TouchableOpacity
          style={styles.pubBtn}
          onPress={() => Alert.alert("Sucesso", "Notícia Publicada!")}
        >
          <Text style={styles.pubBtnText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Noticia Ativa</Text>
        <TouchableOpacity
          style={[styles.pubBtn, { backgroundColor: "#d0021b" }]}
          onPress={() => Alert.alert("Sucesso", "Notícia Removida!")}
        >
          <Text style={styles.pubBtnText}>Despublicar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {telaAtual === "painel" && <TelaPainel />}
      {telaAtual === "perfil" && <TelaPerfil />}
      {telaAtual === "gerenciar" && <TelaGerenciar />}
      {telaAtual === "editarQualquer" && (
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setTelaAtual("painel")}
          >
            <Text>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Editar Qualquer Noticia</Text>
          <Text style={{ color: "#666" }}>
            Selecione uma noticia para editar
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  menuItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#333",
  },
  menuItemText: { fontWeight: "bold", fontSize: 16 },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#333",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  userName: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  backBtn: { marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontWeight: "bold", flex: 1 },
  pubBtn: { backgroundColor: "#4a90e2", padding: 8, borderRadius: 5 },
  pubBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
