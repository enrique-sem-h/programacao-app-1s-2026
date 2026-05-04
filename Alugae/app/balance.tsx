import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Balance() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");

  const handleRedeem = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Saldo alugaê" }} />
      
      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balanceValue}>R$ 150,00</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Valor para resgate</Text>
        <TextInput 
          style={styles.input} 
          placeholder="R$ 0,00" 
          keyboardType="numeric" 
          placeholderTextColor="#888"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Chave Pix para recebimento</Text>
        <TextInput 
          style={styles.input} 
          placeholder="CPF, E-mail ou Telefone" 
          placeholderTextColor="#888"
          value={pixKey}
          onChangeText={setPixKey}
        />

        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={handleRedeem}
        >
          <Text style={styles.mainButtonText}>Resgatar saldo</Text>
        </TouchableOpacity>
      </View>

      <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark-done" size={50} color="#007AFF" />
            </View>
            
            <Text style={styles.modalTitle}>Muito obrigado!</Text>
            <Text style={styles.modalText}>
              Seu resgate de <Text style={{fontWeight: 'bold'}}>R$ {amount || "0,00"}</Text> foi processado para a chave Pix informada. Confira sua conta!
            </Text>
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => {
                setModalVisible(false); 
                router.back();
              }}
            >
              <Text style={styles.closeText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  balanceBox: { 
    backgroundColor: '#E5E5E5', 
    padding: 30, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 30,
    marginTop: 10 
  },
  balanceLabel: { color: '#666', fontSize: 14 },
  balanceValue: { color: '#000', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
  form: { backgroundColor: 'transparent' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginLeft: 5 },
  input: { 
    backgroundColor: '#E5E5E5', 
    padding: 15, 
    borderRadius: 12, 
    color: '#000', 
    height: 55, 
    marginBottom: 20,
    fontSize: 16 
  },
  mainButton: { 
    backgroundColor: '#000', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 10 
  },
  mainButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    width: '85%', 
    backgroundColor: '#fff', 
    padding: 30, 
    borderRadius: 20, 
    alignItems: 'center' 
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  modalText: { textAlign: 'center', color: '#666', marginVertical: 15, lineHeight: 20 },
  closeButton: { 
    backgroundColor: '#000', 
    width: '100%', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  closeText: { color: '#fff', fontWeight: 'bold' }
});