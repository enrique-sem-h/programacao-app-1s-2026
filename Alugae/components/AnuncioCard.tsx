import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import type { Anuncio } from "@/src/@types/types";
import { getFotoPrincipal } from "@/src/@types/types";
import { getOptimizedImageUrl } from "@/src/images/optimizedImage";

interface Props {
  anuncio: Anuncio;
  onPress: (id: string) => void;
}

export function AnuncioCard({ anuncio, onPress }: Props) {
  const coverUrl = getOptimizedImageUrl(getFotoPrincipal(anuncio.fotos), {
    width: 360,
    height: 240,
  });

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(anuncio.id)}>
      {/* Foto de capa */}
      <View style={styles.imageWrapper}>
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imageFallback}>
            <Ionicons name="image-outline" size={30} color="#ccc" />
          </View>
        )}
      </View>

      {/* Informações */}
      <Text style={styles.titulo} numberOfLines={1}>
        {anuncio.titulo}
      </Text>
      <Text style={styles.categoria} numberOfLines={1}>
        {anuncio.categoria}
      </Text>
      <Text style={styles.preco}>
        R$ {anuncio.valorDiario.toFixed(2)}
        <Text style={styles.precoDia}> / dia</Text>
      </Text>
    </TouchableOpacity>
  );
}

// ── Skeleton exibido durante o loading ───────────────────────────────────────

export function AnuncioCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={[styles.imageWrapper, styles.skeletonBox]} />
      <View style={[styles.skeletonLine, { width: "80%" }]} />
      <View style={[styles.skeletonLine, { width: "55%" }]} />
      <View
        style={[
          styles.skeletonLine,
          { width: "40%", backgroundColor: "#d0e4ff" },
        ]}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: "47%",
    marginBottom: 20,
    backgroundColor: "transparent",
  },

  imageWrapper: {
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  imageFallback: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 2,
  },
  categoria: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  preco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
  },
  precoDia: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#555",
  },

  // Skeleton
  skeletonBox: {
    backgroundColor: "#ebebeb",
  },
  skeletonLine: {
    height: 10,
    backgroundColor: "#ebebeb",
    borderRadius: 5,
    marginBottom: 6,
  },
});
