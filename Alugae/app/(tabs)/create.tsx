import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'; // tem q baixar: npx expo install expo-image-picker

export default function Create() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Novo anúncio</Text>

      <TouchableOpacity style={styles.imageSelector} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera-outline" size={40} color="#666" />
            <Text style={styles.placeholderText}>Adicionar foto do objeto</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.label}>O que você está anunciando?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Furadeira" 
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Valor do aluguel (por dia)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="R$ 0,00" 
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} placeholder="Selecione..." editable={false} />
          <Ionicons name="chevron-down" size={18} color="#666" style={styles.iconInside} />
        </View>

        <Text style={styles.label}>Descrição detalhada</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Conte detalhes sobre o estado do objeto, voltagem, etc..." 
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.announceButton}>
          <Text style={styles.announceButtonText}>Anunciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  imageSelector: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 25,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  form: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  iconInside: {
    position: 'absolute',
    right: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  announceButton: {
    backgroundColor: '#000', 
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  announceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});