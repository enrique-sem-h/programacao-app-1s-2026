import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";

export default function Support() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} placeholder="Assunto do problema" />
      
      <Text style={styles.label}>Descreva o problema</Text>
      <TextInput 
        style={[styles.input, { height: 150, textAlignVertical: 'top' }]} 
        multiline 
        placeholder="Conte-nos o que houve..." 
      />

      <TouchableOpacity style={styles.sendButton}>
        <Text style={{ color: "#fff" }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginBottom: 8 },
  input: { backgroundColor: "#eee", padding: 15, borderRadius: 5, marginBottom: 20 },
  sendButton: { backgroundColor: "#333", padding: 15, borderRadius: 5, alignItems: "center", alignSelf: 'center', width: 120 }
});