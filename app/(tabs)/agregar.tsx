import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const params = useLocalSearchParams();

  // Si viene receta por params (modo edición)
  const recetaAEditar = params.receta ? JSON.parse(params.receta as string) : null;

  // Estado
  const [titulo, setTitulo] = useState(recetaAEditar?.titulo || '');
  const [descripcion, setDescripcion] = useState(recetaAEditar?.descripcion || '');
  const [imagenUri, setImagenUri] = useState<string | null>(recetaAEditar?.imagen || null);

  // Función para seleccionar imagen (cámara o galería)
  const elegirImagen = async () => {
    const permisoCamara = await ImagePicker.requestCameraPermissionsAsync();
    const permisoGaleria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permisoCamara.status !== 'granted' || permisoGaleria.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesitan permisos para continuar.');
      return;
    }

    Alert.alert('Seleccionar imagen', '¿Desde dónde quieres agregar la imagen?', [
      {
        text: 'Tomar Foto',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) {
            setImagenUri(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Elegir de Galería',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) {
            setImagenUri(result.assets[0].uri);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  // Guardar o actualizar receta
  const guardarReceta = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const recetasGuardadas = await AsyncStorage.getItem('recetas');
      let recetas = recetasGuardadas ? JSON.parse(recetasGuardadas) : [];

      if (recetaAEditar) {
        // Editar
        recetas = recetas.map((r: any) =>
          r.id === recetaAEditar.id
            ? { ...r, titulo, descripcion, imagen: imagenUri }
            : r
        );
      } else {
        // Agregar nueva
        const nuevaReceta = {
          id: Date.now().toString(),
          titulo,
          descripcion,
          imagen: imagenUri,
        };
        recetas.push(nuevaReceta);
      }

      await AsyncStorage.setItem('recetas', JSON.stringify(recetas));

      Alert.alert('Éxito', recetaAEditar ? 'Receta actualizada' : 'Receta guardada');
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
      <Text style={styles.title}>
        {recetaAEditar ? 'Editar Receta' : 'Agregar Receta'}
      </Text>

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

      <TouchableOpacity
        style={[styles.button, { marginBottom: 10 }]}
        onPress={elegirImagen}
      >
        <Text style={styles.buttonText}>
          {imagenUri ? 'Cambiar Imagen' : 'Agregar Imagen'}
        </Text>
      </TouchableOpacity>

      {imagenUri && (
        <Image
          source={{ uri: imagenUri }}
          style={{ width: '100%', height: 200, marginBottom: 16, borderRadius: 10 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={guardarReceta}>
        <Text style={styles.buttonText}>
          {recetaAEditar ? 'Actualizar Receta' : 'Guardar Receta'}
        </Text>
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
