import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LogoAlugae from "@/assets/images/icon.png";

import { useAnuncios } from "../../src/anuncios/useAnuncios";
import { AnuncioCard, AnuncioCardSkeleton } from "@/components/AnuncioCard";
import { CATEGORIAS } from "@/constants/constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SKELETON_COUNT = 4;

export default function Home() {
  const router = useRouter();
  const { anuncios, loading, error, refresh } = useAnuncios();
  const [refreshing, setRefreshing] = useState(false);

  const handleCardPress = (id: string) => {
    router.push({ pathname: "/adDetails", params: { id } });
  };

  function onRefresh() {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <View style={styles.header}>
            <Image
              source={LogoAlugae}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* ── Banner ─────────────────────────────────────────────────────── */}
          <View style={styles.banner}>
            <Ionicons name="megaphone-outline" size={50} color="#666" />
            <Text style={styles.bannerText}>
              Anuncie o que está parado na sua casa!
            </Text>
          </View>

          {/* ── Categorias ─────────────────────────────────────────────────── */}
          <Text style={styles.sectionTitle}>Categorias</Text>
          <FlatList
            data={CATEGORIAS as readonly string[]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriasList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoriaChip}>
                <Text style={styles.categoriaChipText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* ── Anúncios ───────────────────────────────────────────────────── */}
          <Text style={styles.sectionTitle}>Novidades perto de você</Text>

          {error ? (
            <ErrorState message={error} onRetry={refresh} />
          ) : (
            <View style={styles.grid}>
              {loading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <AnuncioCardSkeleton key={i} />
                  ))
                : anuncios.map((anuncio) => (
                    <AnuncioCard
                      key={anuncio.id}
                      anuncio={anuncio}
                      onPress={handleCardPress}
                    />
                  ))}

              {!loading && anuncios.length === 0 && !error && <EmptyState />}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ── Estados auxiliares ────────────────────────────────────────────────────────

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={states.container}>
      <Ionicons name="cloud-offline-outline" size={40} color="#ccc" />
      <Text style={states.text}>{message}</Text>
      <TouchableOpacity style={states.retryButton} onPress={onRetry}>
        <Text style={states.retryText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={states.container}>
      <Ionicons name="storefront-outline" size={40} color="#ccc" />
      <Text style={states.text}>Nenhum anúncio encontrado.</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "transparent",
  },
  logo: { width: 60, height: 60 },

  banner: {
    height: 180,
    backgroundColor: "#eee",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  bannerText: {
    marginTop: 10,
    color: "#666",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
  },

  categoriasList: { gap: 10, marginBottom: 20 },
  categoriaChip: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoriaChipText: { color: "#fff", fontWeight: "600" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});

const states = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "transparent",
    gap: 12,
  },
  text: { color: "#aaa", fontSize: 14, textAlign: "center" },
  retryButton: {
    marginTop: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
