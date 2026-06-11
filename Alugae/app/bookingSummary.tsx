import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function BookingSummary() {
  const router = useRouter();
  const { token } = useAuth();
  const { anuncioId, titulo, valorDiario, caucao, fotoPrincipal } =
    useLocalSearchParams<{
      anuncioId: string;
      titulo: string;
      valorDiario: string;
      caucao: string;
      fotoPrincipal: string;
    }>();

  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFim, setShowPickerFim] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => date.toLocaleDateString("pt-BR");
  const formatDateISO = (date: Date) => date.toISOString().split("T")[0];

  const calcularDias = () => {
    if (!dataInicio || !dataFim) return 0;
    const diff = dataFim.getTime() - dataInicio.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const dias = calcularDias();
  const valorAluguel = dias * Number(valorDiario);
  const valorCaucao = Number(caucao);
  const total = valorAluguel + valorCaucao;

  async function handleContinuar() {
    if (!dataInicio || !dataFim) {
      Alert.alert("Atenção", "Selecione as datas de início e fim.");
      return;
    }
    if (dataFim <= dataInicio) {
      Alert.alert("Atenção", "A data final deve ser após a data inicial.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/pagamento/criar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          anuncioId,
          dataInicio: formatDateISO(dataInicio),
          dataFim: formatDateISO(dataFim),
          valorTotal: total,
          caucao: valorCaucao,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error ?? "Erro ao criar pagamento.");
        return;
      }

      router.push({
        pathname: "/paymentMethods",
        params: {
          url: data.url,
          aluguelId: data.aluguelId,
          locadorId: data.locadorId,
          total: total.toFixed(2),
          titulo,
        },
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Resumo da reserva" }} />

      <View style={styles.productCard}>
        {fotoPrincipal ? (
          <Image source={{ uri: fotoPrincipal }} style={styles.bigImage} />
        ) : (
          <View style={styles.bigImage} />
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{titulo}</Text>
          <Text style={styles.productPrice}>R$ {Number(valorDiario).toFixed(2)} / dia</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.dateBox}>
          <Text style={styles.label}>Data inicial</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPickerInicio(true)}>
            <Text style={{ color: dataInicio ? "#000" : "#999" }}>
              {dataInicio ? formatDate(dataInicio) : "Selecionar"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.label}>Data final</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPickerFim(true)}>
            <Text style={{ color: dataFim ? "#000" : "#999" }}>
              {dataFim ? formatDate(dataFim) : "Selecionar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showPickerInicio && (
        <DateTimePicker
          value={dataInicio ?? new Date()}
          mode="date"
          minimumDate={new Date()}
          onChange={(_, date) => {
            setShowPickerInicio(false);
            if (date) setDataInicio(date);
          }}
        />
      )}

      {showPickerFim && (
        <DateTimePicker
          value={dataFim ?? new Date()}
          mode="date"
          minimumDate={dataInicio ?? new Date()}
          onChange={(_, date) => {
            setShowPickerFim(false);
            if (date) setDataFim(date);
          }}
        />
      )}

      <View style={styles.priceSummary}>
        <Text style={styles.priceItem}>
          Aluguel: {dias} dia{dias !== 1 ? "s" : ""} × R$ {Number(valorDiario).toFixed(2)} = R$ {valorAluguel.toFixed(2)}
        </Text>
        <Text style={styles.priceItem}>Caução: R$ {valorCaucao.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.mainButton, loading && { opacity: 0.6 }]}
        onPress={handleContinuar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continuar para pagamento</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  productCard: {
    backgroundColor: "#E5E5E5", padding: 15, borderRadius: 12,
    flexDirection: "row", marginBottom: 25,
  },
  bigImage: { width: 80, height: 80, backgroundColor: "#D9D9D9", borderRadius: 8 },
  productDetails: { flex: 1, marginLeft: 15, backgroundColor: "transparent", justifyContent: "center" },
  productTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  productPrice: { color: "#007AFF", fontWeight: "600" },
  row: { flexDirection: "row", gap: 15, backgroundColor: "transparent", marginBottom: 20 },
  dateBox: { flex: 1, backgroundColor: "transparent" },
  label: { fontWeight: "bold", marginBottom: 8, fontSize: 13 },
  dateInput: { backgroundColor: "#E5E5E5", padding: 12, borderRadius: 8, alignItems: "center" },
  priceSummary: { borderTopWidth: 1, borderColor: "#333", paddingTop: 20, backgroundColor: "transparent" },
  priceItem: { fontSize: 14, marginBottom: 5, color: "#888" },
  totalText: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  mainButton: {
    backgroundColor: "#000", padding: 18, borderRadius: 12,
    marginTop: 30, alignItems: "center", marginBottom: 40,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});