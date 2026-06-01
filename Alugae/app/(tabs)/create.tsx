import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";

import { useCreateForm } from "@/src/create/useCreateForm";
import { ImageSelector } from "@/components/ImageSelector";
import { CategoriaModal } from "@/components/CategoriaModal";
import { SuccessModal } from "@/components/SuccessModal";
import type { Categoria } from "@/constants/constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Create() {
  const {
    form,
    loading,
    successModalVisible,
    setField,
    pickImages,
    removeImage,
    handleSubmit,
    handleReset,
  } = useCreateForm();

  const [categoriaModalVisible, setCategoriaModalVisible] = useState(false);

  const handleSelectCategoria = (cat: Categoria) => {
    setField("categoria")(cat);
    setCategoriaModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.pageTitle}>Novo anúncio</Text>

          {/* ── Photos ───────────────────────────────────────────────────────── */}
          <View style={styles.imageSection}>
            <ImageSelector
              images={form.images}
              onAdd={pickImages}
              onRemove={removeImage}
            />
          </View>

          {/* ── Form ─────────────────────────────────────────────────────────── */}
          <View style={styles.form}>
            <Text style={styles.label}>O que você está anunciando?</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Furadeira"
              placeholderTextColor="#999"
              value={form.title}
              onChangeText={setField("title")}
            />

            {/* Preço + Caução */}
            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Aluguel (por dia)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                  value={form.price}
                  onChangeText={setField("price")}
                />
              </View>

              <View style={styles.rowSpacer} />

              <View style={styles.flex1}>
                <Text style={styles.label}>Caução</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                  value={form.caucao}
                  onChangeText={setField("caucao")}
                />
              </View>
            </View>

            {/* Categoria */}
            <Text style={styles.label}>Categoria</Text>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setCategoriaModalVisible(true)}
            >
              <Text
                style={[
                  styles.selectText,
                  !form.categoria && styles.placeholder,
                ]}
              >
                {form.categoria || "Selecione uma categoria"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#666" />
            </TouchableOpacity>

            {/* Descrição */}
            <Text style={styles.label}>Descrição detalhada</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conte detalhes sobre o estado do objeto..."
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
              value={form.descricao}
              onChangeText={setField("descricao")}
            />

            {/* Submit */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Anunciar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ── Modals ───────────────────────────────────────────────────────── */}
          <CategoriaModal
            visible={categoriaModalVisible}
            selected={form.categoria}
            onSelect={handleSelectCategoria}
            onClose={() => setCategoriaModalVisible(false)}
          />

          <SuccessModal
            visible={successModalVisible}
            form={form}
            onClose={handleReset}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },

  imageSection: { marginBottom: 25, backgroundColor: "transparent" },

  form: { backgroundColor: "transparent" },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 8, color: "#333" },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  textArea: { height: 120, textAlignVertical: "top" },

  row: { flexDirection: "row", backgroundColor: "transparent" },
  rowSpacer: { width: 12 },
  flex1: { flex: 1 },

  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 20,
  },
  selectText: { fontSize: 16, color: "#000", flex: 1 },
  placeholder: { color: "#999" },

  submitButton: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
