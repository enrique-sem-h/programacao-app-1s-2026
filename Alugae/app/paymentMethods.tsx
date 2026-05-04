import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";

export default function PaymentMethods() {
  const router = useRouter();

  const Method = ({ title, subtitle }: any) => (
    <TouchableOpacity style={styles.methodCard} onPress={() => router.push("/rentalStatus")}>
      <View style={styles.radio} />
      <View style={{ backgroundColor: 'transparent', flex: 1 }}>
        <Text style={styles.methodTitle}>{title}</Text>
        {subtitle && <Text style={styles.methodSub}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Métodos de pagamento" }} />
      <Method title="Cartão de Crédito/Debito" subtitle="*** *** *** 4532" />
      <Method title="Pix" subtitle="Pagamento instantâneo" />
      <Method title="Saldo alugaê" subtitle="R$ 150,00 disponíveis" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  methodCard: { backgroundColor: '#E5E5E5', padding: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#000', marginRight: 15 },
  methodTitle: { color: '#000', fontWeight: 'bold' },
  methodSub: { color: '#666', fontSize: 12, marginTop: 4 }
});