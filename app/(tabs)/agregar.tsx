import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AgregarReceta() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const guardarReceta = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const nuevaReceta = {
        id: Date.now().toString(),
        titulo,
        descripcion,
      };

      const recetasGuardadas = await AsyncStorage.getItem('recetas');
      const recetas = recetasGuardadas ? JSON.parse(recetasGuardadas) : [];

      recetas.push(nuevaReceta);
      await AsyncStorage.setItem('recetas', JSON.stringify(recetas));

      Alert.alert('Éxito', 'Receta guardada correctamente');
      setTitulo('');
      setDescripcion('');
      router.push('/(tabs)/recetas'); // Navega a la lista
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la receta');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Receta</Text>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        placeholder="Descripción"
        style={[styles.input, styles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={guardarReceta}>
        <Text style={styles.buttonText}>Guardar Receta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A84E0E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E38B29',
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
