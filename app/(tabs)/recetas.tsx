import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RecetaCard from '../../components/RecetaCard';

export default function RecetasScreen() {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const cargarRecetas = async () => {
    try {
      const data = await AsyncStorage.getItem('recetas');
      const recetasParseadas = data ? JSON.parse(data) : [];
      setRecetas(recetasParseadas);
    } catch (error) {
      console.error('Error al cargar recetas:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarRecetas();
    }, [])
  );

  const eliminarReceta = async (id: string) => {
    const nuevasRecetas = recetas.filter((r) => r.id !== id);
    await AsyncStorage.setItem('recetas', JSON.stringify(nuevasRecetas));
    setRecetas(nuevasRecetas);
  };

  const editarReceta = (receta: any) => {
    router.push({
      pathname: '/(tabs)/agregar',
      params: { receta: JSON.stringify(receta) },
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/fondo_recetas.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Mis Recetas</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#E38B29" />
        ) : recetas.length === 0 ? (
          <Text style={styles.vacio}>No tienes recetas guardadas aún.</Text>
        ) : (
          <FlatList
            data={recetas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecetaCard
                receta={item}
                onEliminar={eliminarReceta}
                onEditar={editarReceta}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A84E0E',
    textAlign: 'center',
    marginBottom: 20,
  },
  vacio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
});
