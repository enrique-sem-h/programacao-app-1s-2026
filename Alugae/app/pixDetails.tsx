import React from "react";
import { StyleSheet, TouchableOpacity, Share } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PixDetails() {
  const pixKey = "mariana@email.com"; 
  const onShare = async () => {
    try {
      await Share.share({ message: `Minha chave Pix no Alugaê: ${pixKey}` });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Métodos de pagamento" }} />
      
      <Text style={styles.sectionTitle}>Sua chave Pix</Text>
      
      <View style={styles.pixCard}>
        <Ionicons name="qr-code-outline" size={100} color="#000" />
        <Text style={styles.pixLabel}>Chave cadastrada:</Text>
        <Text style={styles.pixValue}>{pixKey}</Text>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Ionicons name="share-social-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Compartilhar Chave</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Alterar chave Pix</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 20 },
  pixCard: { backgroundColor: '#E5E5E5', width: '100%', padding: 40, borderRadius: 20, alignItems: 'center', marginBottom: 30 },
  pixLabel: { color: '#666', marginTop: 20, fontSize: 12, textTransform: 'uppercase' },
  pixValue: { color: '#000', fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  shareButton: { backgroundColor: '#000', width: '100%', padding: 18, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  secondaryButton: { marginTop: 20, backgroundColor: 'transparent' },
  secondaryButtonText: { color: '#888', fontWeight: 'bold' }
});