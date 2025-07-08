import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AgregarReceta() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUri, setImagenUri] = useState<string | null>(null);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagenUri(result.assets[0].uri);
    }
  };

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
        imagen: imagenUri, // guarda la URI si hay
      };

      const recetasGuardadas = await AsyncStorage.getItem('recetas');
      const recetas = recetasGuardadas ? JSON.parse(recetasGuardadas) : [];

      recetas.push(nuevaReceta);
      await AsyncStorage.setItem('recetas', JSON.stringify(recetas));

      Alert.alert('Éxito', 'Receta guardada correctamente');
      setTitulo('');
      setDescripcion('');
      setImagenUri(null);
      router.push('/(tabs)/recetas');
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

      <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={seleccionarImagen}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imagenUri && (
        <Image
          source={{ uri: imagenUri }}
          style={{ width: '100%', height: 200, marginBottom: 16, borderRadius: 10 }}
        />
      )}

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
