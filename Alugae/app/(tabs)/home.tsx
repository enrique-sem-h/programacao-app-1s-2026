import React from "react";
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import LogoAlugae from "@/assets/images/icon.png"; 

export default function Home() {
  const router = useRouter();
  const categorias = ["Ferramentas", "Camping", "Câmeras", "Esportes"];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <Image 
          source={LogoAlugae} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.banner}>
        <Ionicons name="megaphone-outline" size={50} color="#666" />
        <Text style={styles.bannerText}>Anuncie o que está parado na sua casa!</Text>
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        data={categorias}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        style={styles.categoriesList}
      />

      <Text style={styles.sectionTitle}>Novidades perto de você</Text>
      <View style={styles.grid}>
        {[1, 2, 3, 4].map((item) => (
          <TouchableOpacity 
            key={item} 
            style={styles.itemCard}
            onPress={() => router.push("/adDetails")} 
          >
            <View style={styles.itemImage}>
               <Ionicons name="image-outline" size={30} color="#ccc" />
            </View>
            <View style={styles.itemLine} />
            <View style={[styles.itemLine, { width: '60%' }]} />
            <View style={[styles.itemLine, { width: '40%', backgroundColor: '#007AFF' }]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
} 

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  header: {
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  logoImage: {
    width: 60, 
    height: 60,
    marginBottom: 5,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  banner: { 
    height: 180, 
    backgroundColor: "#eee", 
    borderRadius: 12, 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 25, 
    borderWidth: 1, 
    borderColor: "#ddd" 
  },
  bannerText: { 
    marginTop: 10, 
    color: "#666", 
    fontWeight: "600", 
    textAlign: "center", 
    paddingHorizontal: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 15, 
    marginTop: 10 
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryCard: { 
    backgroundColor: "#000", 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginRight: 10 
  },
  categoryText: { 
    color: "#fff", 
    fontWeight: "600" 
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    backgroundColor: 'transparent' 
  },
  itemCard: { 
    width: "47%", 
    marginBottom: 20, 
    backgroundColor: 'transparent' 
  },
  itemImage: { 
    height: 120, 
    backgroundColor: "#f0f0f0", 
    borderRadius: 8, 
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemLine: { 
    height: 10, 
    backgroundColor: "#eee", 
    borderRadius: 5, 
    marginBottom: 5 
  }
});