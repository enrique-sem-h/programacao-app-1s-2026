import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Rating() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliação do aluguel</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Ionicons key={s} name="star-outline" size={30} color="#ccc" />
        ))}
      </View>
      <TextInput style={styles.commentBox} placeholder="Deixe um comentário..." multiline />
      <TouchableOpacity style={styles.finishButton}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  starsRow: { flexDirection: 'row', marginBottom: 20 },
  commentBox: { width: '100%', height: 100, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10 },
  finishButton: { backgroundColor: '#000', width: '100%', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' }
});