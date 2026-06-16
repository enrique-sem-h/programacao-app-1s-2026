import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Rating() {
  const [modalVisible, setModalVisible] = useState(false);
  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useAuth();
  const { aluguelId, titulo } = useLocalSearchParams<{
    aluguelId: string;
    titulo: string;
  }>();

  async function handleFinish() {
    if (estrelas === 0) {
      Alert.alert("Atenção", "Selecione pelo menos uma estrela.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/alugueis/${aluguelId}/avaliar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estrelas, comentario }),
      });

      if (response.status === 409) {
        Alert.alert("Atenção", "Você já avaliou este aluguel.");
        return;
      }

      if (response.ok) {
        setModalVisible(true);
      } else {
        const data = await response.json();
        Alert.alert("Erro", data.error ?? "Erro ao enviar avaliação.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setModalVisible(false);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliação do aluguel</Text>
      {titulo && <Text style={styles.subtitle}>{titulo}</Text>}

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <TouchableOpacity key={s} onPress={() => setEstrelas(s)}>
            <Ionicons
              name={s <= estrelas ? "star" : "star-outline"}
              size={40}
              color={s <= estrelas ? "#FFD700" : "#888"}
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentBox}
        placeholder="Deixe um comentário..."
        multiline
        placeholderTextColor="#999"
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity
        style={[styles.finishButton, loading && { opacity: 0.6 }]}
        onPress={handleFinish}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Finalizar</Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="heart" size={50} color="#FF3B30" />
            </View>

            <Text style={styles.modalTitle}>Obrigado pela avaliação!</Text>
            <Text style={styles.modalSubText}>
              Sua opinião ajuda a manter a comunidade do Alugaê segura e confiável.
            </Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons
                  key={s}
                  name={s <= estrelas ? "star" : "star-outline"}
                  size={24}
                  color={s <= estrelas ? "#FFD700" : "#ccc"}
                  style={{ marginHorizontal: 3 }}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Voltar ao início</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, marginTop: 20 },
  subtitle: { fontSize: 14, color: "#888", marginBottom: 25 },
  starsRow: { flexDirection: "row", marginBottom: 30, backgroundColor: "transparent" },
  commentBox: {
    width: "100%", height: 120, borderWidth: 1,
    borderColor: "#ddd", backgroundColor: "#f5f5f5",
    borderRadius: 12, padding: 15,
    textAlignVertical: "top", fontSize: 16, color: "#000",
  },
  finishButton: {
    backgroundColor: "#000", width: "100%",
    padding: 18, borderRadius: 12, marginTop: 30, alignItems: "center",
  },
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center", alignItems: "center",
  },
  modalContent: {
    width: "85%", backgroundColor: "#fff",
    borderRadius: 20, padding: 30, alignItems: "center",
  },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#FFF0F0", justifyContent: "center",
    alignItems: "center", marginBottom: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#000", textAlign: "center" },
  modalSubText: { fontSize: 14, color: "#666", textAlign: "center", marginVertical: 15 },
  closeButton: {
    backgroundColor: "#000", width: "100%",
    padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10,
  },
});