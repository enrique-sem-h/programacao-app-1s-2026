import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";

export default function BookingSummary() {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Resumo da reserva" }} />
      
      <View style={styles.productCard}>
        <View style={styles.bigImage} />
        <View style={styles.productDetails}>
          <View style={[styles.line, { width: '80%' }]} />
          <View style={[styles.line, { width: '50%', marginTop: 10 }]} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.dateBox}>
          <Text style={styles.label}>Data inicial</Text>
          <TextInput style={styles.dateInput} placeholder="00/00/00" editable={false} />
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.label}>Data final</Text>
          <TextInput style={styles.dateInput} placeholder="00/00/00" editable={false} />
        </View>
      </View>

      <View style={styles.quantityRow}>
        <Text style={styles.label}>Quantidade</Text>
        <View style={styles.qtyControls}>
          <TouchableOpacity onPress={() => setQty(Math.max(1, qty-1))} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity onPress={() => setQty(qty+1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.priceSummary}>
        <Text style={styles.priceItem}>Aluguel: R$ 00,00</Text>
        <Text style={styles.priceItem}>Taxas: R$ 00,00</Text>
        <Text style={styles.totalText}>Total: R$ 00,00</Text>
      </View>

      <TouchableOpacity style={styles.mainButton} onPress={() => router.push("/paymentMethods")}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  productCard: { backgroundColor: '#E5E5E5', padding: 15, borderRadius: 12, flexDirection: 'row', marginBottom: 25 },
  bigImage: { width: 80, height: 80, backgroundColor: '#D9D9D9', borderRadius: 8 },
  productDetails: { flex: 1, marginLeft: 15, backgroundColor: 'transparent' },
  line: { height: 12, backgroundColor: '#CCC', borderRadius: 6 },
  row: { flexDirection: 'row', gap: 15, backgroundColor: 'transparent', marginBottom: 20 },
  dateBox: { flex: 1, backgroundColor: 'transparent' },
  label: { fontWeight: 'bold', marginBottom: 8, fontSize: 13 },
  dateInput: { backgroundColor: '#E5E5E5', padding: 12, borderRadius: 8, textAlign: 'center' },
  quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', marginBottom: 30 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5E5E5', borderRadius: 8, padding: 5 },
  qtyBtn: { padding: 10, paddingHorizontal: 15 },
  qtyText: { fontWeight: 'bold', marginHorizontal: 10 },
  priceSummary: { borderTopWidth: 1, borderColor: '#333', paddingTop: 20, backgroundColor: 'transparent' },
  priceItem: { fontSize: 14, marginBottom: 5, color: '#888' },
  totalText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  mainButton: { backgroundColor: '#000', padding: 18, borderRadius: 12, marginTop: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});