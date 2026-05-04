import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ReturnObject() {
  const router = useRouter();
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Devolver Objeto" }} />

      <Text style={styles.sectionTitle}>Estado do Objeto</Text>
      <Text style={styles.description}>
        Tire uma foto atual do item para confirmar que ele está sendo devolvido nas mesmas condições.
      </Text>

      <TouchableOpacity style={styles.imageSelector} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera-outline" size={40} color="#666" />
            <Text style={styles.placeholderText}>Adicionar foto de agora</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.label}>Alguma observação importante?</Text>
        <TextInput 
          style={styles.textArea} 
          placeholder="Ex: Objeto limpo e com todos os acessórios inclusos..." 
          multiline
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Método de Devolução</Text>
        <View style={styles.methodCard}>
          <Ionicons name="bicycle-outline" size={24} color="#000" />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>Entregar ao Locador</Text>
            <Text style={styles.methodSub}>Combinar via chat o local exato</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color="#000" />
        </View>

        <TouchableOpacity 
          style={styles.chatShortcut} 
          onPress={() => router.push("/chatDetails")}
        >
          <Ionicons name="chatbubbles-outline" size={22} color="#fff" />
          <Text style={styles.chatShortcutText}>Combinar local no Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            router.replace("/(tabs)/home");
          }}
        >
          <Text style={styles.buttonText}>Confirmar Devolução</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  description: { 
    fontSize: 14, 
    color: '#888', 
    marginBottom: 20, 
    lineHeight: 20 
  },
  imageSelector: { 
    width: '100%', 
    height: 180, 
    backgroundColor: '#E5E5E5', 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 25,
    overflow: 'hidden'
  },
  previewImage: { 
    width: '100%', 
    height: '100%' 
  },
  placeholderContainer: { 
    alignItems: 'center', 
    backgroundColor: 'transparent' 
  },
  placeholderText: { 
    marginTop: 10, 
    color: '#666', 
    fontSize: 12 
  },
  form: { 
    backgroundColor: 'transparent' 
  },
  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  textArea: { 
    backgroundColor: '#E5E5E5', 
    borderRadius: 12, 
    padding: 15, 
    height: 100, 
    textAlignVertical: 'top', 
    color: '#000', 
    marginBottom: 25 
  },
  methodCard: { 
    backgroundColor: '#E5E5E5', 
    padding: 15, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  methodInfo: { 
    flex: 1, 
    marginLeft: 15, 
    backgroundColor: 'transparent' 
  },
  methodTitle: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    color: '#000' 
  },
  methodSub: { 
    fontSize: 12, 
    color: '#666' 
  },
  chatShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  chatShortcutText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  primaryButton: { 
    backgroundColor: '#E5E5E5', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center'
  },
  buttonText: { 
    color: '#000', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});