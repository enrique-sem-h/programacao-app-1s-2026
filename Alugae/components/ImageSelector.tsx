import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { MAX_PHOTOS } from "@/constants/constants";

interface Props {
  images: string[];
  onAdd: () => void;
  onRemove: (uri: string) => void;
}

export function ImageSelector({ images, onAdd, onRemove }: Props) {
  const showAddButton = images.length < MAX_PHOTOS;

  const data = [
    ...images,
    ...(showAddButton ? ["ADD_BUTTON"] : []),
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item + index}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) =>
        item === "ADD_BUTTON" ? (
          <AddButton count={images.length} onPress={onAdd} />
        ) : (
          <ImageThumb
            uri={item}
            isCover={images[0] === item}
            onRemove={() => onRemove(item)}
          />
        )
      }
      ListEmptyComponent={<AddButton count={0} onPress={onAdd} />}
    />
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AddButton({ count, onPress }: { count: number; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Ionicons name="camera-outline" size={28} color="#666" />
      <Text style={styles.addLabel}>
        {count === 0 ? "Adicionar fotos" : "Mais fotos"}
      </Text>
      <Text style={styles.addCount}>
        {count}/{MAX_PHOTOS}
      </Text>
    </TouchableOpacity>
  );
}

function ImageThumb({
  uri,
  isCover,
  onRemove,
}: {
  uri: string;
  isCover: boolean;
  onRemove: () => void;
}) {
  return (
    <View style={styles.thumbContainer}>
      <Image source={{ uri }} style={styles.thumb} />

      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      >
        <Ionicons name="close-circle" size={22} color="#fff" />
      </TouchableOpacity>

      {isCover && (
        <View style={styles.coverBadge}>
          <Text style={styles.coverText}>Capa</Text>
        </View>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const THUMB_SIZE = 120;

const styles = StyleSheet.create({
  list: { gap: 10 },

  addButton: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  addLabel: { fontSize: 11, color: "#666", textAlign: "center" },
  addCount: { fontSize: 11, color: "#aaa" },

  thumbContainer: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumb: { width: "100%", height: "100%" },

  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 11,
  },

  coverBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  coverText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
