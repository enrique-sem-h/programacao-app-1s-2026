import React, { useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";

export default function Support() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSend = () => {
    setModalVisible(true);
  };     // mudar dps

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} placeholder="Assunto do problema" placeholderTextColor="#888" />
      
      <Text style={styles.label}>Descreva o problema</Text>
      <TextInput 
        style={[styles.input, { height: 150, textAlignVertical: 'top' }]} 
        multiline 
        placeholder="Conte-nos o que houve..." 
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Enviar</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#4BB543" />
            <Text style={styles.modalTitle}>Muito obrigado!</Text>
            <Text style={styles.modalText}>Recebemos seu e-mail e entraremos em contato em breve.</Text>
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginBottom: 8 },
  input: { backgroundColor: "#eee", padding: 15, borderRadius: 5, marginBottom: 20, color: "#000" },
  sendButton: { 
    backgroundColor: "#333", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    alignSelf: 'center', 
    width: 140 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#000",
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginVertical: 15,
  },
  closeButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  }
});