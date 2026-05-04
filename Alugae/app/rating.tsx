import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";
import { Text, View } from "@/components/Themed"; 
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Rating() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleFinish = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliação do aluguel</Text>
      
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <TouchableOpacity key={s}>
            <Ionicons name="star-outline" size={40} color="#888" style={{ marginHorizontal: 5 }} />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput 
        style={styles.commentBox} 
        placeholder="Deixe um comentário..." 
        multiline 
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Finalizar</Text>
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
            
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center' 
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, marginTop: 20 },
  starsRow: { flexDirection: 'row', marginBottom: 30, backgroundColor: 'transparent' },
  commentBox: { 
    width: '100%', 
    height: 120, 
    borderWidth: 1, 
    borderColor: '#444', 
    backgroundColor: '#333', 
    borderRadius: 12, 
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#fff' 
  },
  finishButton: { 
    backgroundColor: '#000', 
    width: '100%', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 30, 
    alignItems: 'center' 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff", 
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF0F0', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#000", textAlign: "center" },
  modalSubText: { fontSize: 14, color: "#666", textAlign: "center", marginVertical: 15 },
  closeButton: { backgroundColor: "#000", width: '100%', padding: 15, borderRadius: 10, alignItems: "center" },
});