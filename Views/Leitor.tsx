import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';

export default function Leitor() {
  const [telaAtual, setTelaAtual] = useState<'perfil' | 'comentar'>('perfil');
  const [comentario, setComentario] = useState('');

  const TelaPerfil = () => (
    <View style={styles.content}>
      <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>E</Text></View>
      <Text style={styles.userName}>Enrique</Text>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => setTelaAtual('comentar')}>
        <Text style={styles.menuItemText}>Ir para Comentarios</Text>
      </TouchableOpacity>
    </View>
  );

  const TelaComentar = () => (
    <View style={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setTelaAtual('perfil')}>
        <Text>← Voltar ao Perfil</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Comentar Noticia</Text>
      <TextInput 
        style={[styles.input, { height: 120 }]} 
        placeholder="Escreva seu comentario aqui..." 
        multiline
        value={comentario}
        onChangeText={setComentario}
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => {
        Alert.alert("Sucesso", "Comentario enviado!");
        setComentario('');
        setTelaAtual('perfil');
      }}>
        <Text style={styles.buttonText}>Postar Comentario</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {telaAtual === 'perfil' && <TelaPerfil />}
      {telaAtual === 'comentar' && <TelaComentar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  content: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#50c878', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  menuItem: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 2 },
  menuItemText: { fontWeight: 'bold', color: '#50c878', textAlign: 'center' },
  backBtn: { marginBottom: 20 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#50c878', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});