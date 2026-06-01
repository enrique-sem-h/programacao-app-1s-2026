import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import type { FormState } from "@/src/create/useCreateForm";
import { useRouter } from "expo-router";

interface Props {
  visible: boolean;
  form: FormState;
  onClose: () => void;
}

export function SuccessModal({ visible, form, onClose }: Props) {
  const router = useRouter();
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Ionicons name="checkmark-done-circle" size={70} color="#007AFF" />

          <Text style={styles.title}>Anúncio Criado!</Text>

          <SummaryBox form={form} />

          <Text style={styles.subtitle}>
            Seu objeto já está disponível para aluguel no Alugaê.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClose();
              router.replace("/home");
            }}
          >
            <Text style={styles.buttonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SummaryBox({ form }: { form: FormState }) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Item", value: form.title || "Não informado" },
    { label: "Categoria", value: form.categoria || "—" },
    { label: "Aluguel", value: `R$ ${form.price || "0,00"} / dia` },
    { label: "Caução", value: `R$ ${form.caucao || "0,00"}` },
    { label: "Fotos", value: String(form.images.length) },
  ];

  return (
    <View style={styles.summary}>
      <Text style={styles.summaryLabel}>Resumo</Text>
      {rows.map(({ label, value }) => (
        <Text key={label} style={styles.summaryRow}>
          <Text style={styles.summaryKey}>{label}:</Text> {value}
        </Text>
      ))}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  summary: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  summaryRow: { fontSize: 16, color: "#333", marginBottom: 3 },
  summaryKey: { fontWeight: "bold" },
});
