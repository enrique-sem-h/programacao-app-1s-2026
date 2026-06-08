import React from "react";
import { StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PaymentMethods() {
  const router = useRouter();
  const { token } = useAuth();
  const { url, aluguelId, total } = useLocalSearchParams<{
    url: string;
    aluguelId: string;
    total: string;
  }>();

  async function handlePix() {
    if (!url) {
      Alert.alert("Erro", "URL de pagamento não encontrada.");
      return;
    }

    try {
      await Linking.openURL(url);

      await fetch(`${API_URL}/pagamento/confirmar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ aluguelId }),
      });

      router.push("/myRentals");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o link de pagamento.");
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Métodos de pagamento" }} />

      <Text style={styles.totalText}>Total: R$ {total}</Text>

      <TouchableOpacity style={styles.methodCard} onPress={handlePix}>
        <View style={styles.radio} />
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
          <Text style={styles.methodTitle}>Pix</Text>
          <Text style={styles.methodSub}>Pagamento instantâneo via Abacatepay</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.info}>
        Ao clicar em Pix, você será redirecionado para a página de pagamento.
        Após pagar, volte ao app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  totalText: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  methodCard: {
    backgroundColor: "#E5E5E5",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 15,
  },
  methodTitle: { color: "#000", fontWeight: "bold" },
  methodSub: { color: "#666", fontSize: 12, marginTop: 4 },
  info: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
});