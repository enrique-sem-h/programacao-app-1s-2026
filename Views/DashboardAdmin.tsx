import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type CategoriasDados = "Cidades" | "Tags" | "Perfis" | "UF" | "Noticias" | "Usuarios" | "Comentarios";

export default function DashboardAdmin({ navigation }: any) {
  const [crudAtivo, setCrudAtivo] = useState<CategoriasDados | null>(null);
  const [novoItemTexto, setNovoItemTexto] = useState("");

  const [dados, setDados] = useState({
    Cidades: ["Joinville", "Florianópolis"],
    Tags: ["Tecnologia", "Educação"],
    Perfis: ["Administrador", "Autor", "Leitor"],
    UF: ["SC", "PR", "SP"],
    Noticias: ["AWS na Católica"],
    Usuarios: ["Mariana", "Admin"],
    Comentarios: ["Excelente projeto!"],
  });

  const adicionarItem = () => {
    if (novoItemTexto.trim() === "" || !crudAtivo) return;
    setDados((prev) => ({
      ...prev,
      [crudAtivo]: [...prev[crudAtivo], novoItemTexto],
    }));
    setNovoItemTexto("");
  };

  const deletarItem = (itemParaDeletar: string) => {
    if (!crudAtivo) return;
    setDados((prev) => ({
      ...prev,
      [crudAtivo]: prev[crudAtivo].filter((item) => item !== itemParaDeletar),
    }));
  };

  const menuItens = [
    { id: "1", nome: "Cidades", icon: "map-pin" },
    { id: "2", nome: "Tags", icon: "hash" },
    { id: "3", nome: "Perfis", icon: "users" },
    { id: "4", nome: "UF", icon: "map" },
    { id: "5", nome: "Noticias", icon: "file-text" },
    { id: "6", nome: "Usuarios", icon: "user-plus" },
    { id: "7", nome: "Comentarios", icon: "message-square" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerDashboard}>
        <Text style={styles.title}>Painel SuperAdmin</Text>
      </View>

      <FlatList
        data={menuItens}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardMenu}
            onPress={() => setCrudAtivo(item.nome as CategoriasDados)}
          >
            <Feather name={item.icon as any} size={26} color="#6c5ce7" />
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ padding: 20 }}>
        <Button title="Sair do Painel" color="#ff4757" onPress={() => navigation.goBack()} />
      </View>

      <Modal visible={crudAtivo !== null} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setCrudAtivo(null)}>
              <Feather name="chevron-left" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Gerenciar {crudAtivo}</Text>
          </View>

          <View style={styles.addArea}>
            <TextInput
              style={styles.input}
              placeholder="Adicionar novo..."
              value={novoItemTexto}
              onChangeText={setNovoItemTexto}
            />
            <TouchableOpacity style={styles.btnPlus} onPress={adicionarItem}>
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={crudAtivo ? dados[crudAtivo] : []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemLinha}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => deletarItem(item)}>
                  <Feather name="trash-2" size={20} color="#ff4757" />
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerDashboard: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "900" },
  cardMenu: {
    flex: 1,
    backgroundColor: "#f8f9fd",
    margin: 10,
    height: 110,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cardText: { marginTop: 10, fontWeight: "bold" },
  modalContainer: { flex: 1, backgroundColor: "#fff", padding: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: "bold" },
  addArea: { flexDirection: "row", gap: 10, marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12 },
  btnPlus: { backgroundColor: "#6c5ce7", padding: 12, borderRadius: 10 },
  itemLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
},
});