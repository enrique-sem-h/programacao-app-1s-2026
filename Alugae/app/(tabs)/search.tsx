import React from "react";
import {
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ColorSchemeName,
} from "react-native";
import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function Search() {
  const router = useRouter();
  const styles = createStyles(useColorScheme());

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="O que você está procurando?"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => router.push("/adDetails")}
            >
              <View style={styles.resultImage}>
                <Ionicons name="image-outline" size={30} color="#ccc" />
              </View>
              <View style={styles.resultInfo}>
                <View style={styles.infoLine} />
                <View style={[styles.infoLine, { width: "80%" }]} />
                <View
                  style={[
                    styles.infoLine,
                    { width: "40%", backgroundColor: "#007AFF" },
                  ]}
                />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const createStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.light.background,
      borderRadius: 10,
      paddingHorizontal: 15,
      height: 50,
      marginBottom: 20,
    },
    searchInput: { flex: 1, fontSize: 16, color: "#000" },
    resultItem: {
      flexDirection: "row",
      marginBottom: 20,
      backgroundColor: "transparent",
    },
    resultImage: {
      width: 100,
      height: 100,
      backgroundColor: "#eee",
      borderRadius: 8,
      marginRight: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    resultInfo: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    infoLine: {
      height: 12,
      backgroundColor: "#f0f0f0",
      borderRadius: 6,
      marginBottom: 10,
    },
  });
