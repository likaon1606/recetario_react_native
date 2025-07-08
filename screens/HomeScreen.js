import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/cocina_fondo_principal.jpg')} // Cambia esto con tu imagen
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.centro}>
        <Text style={styles.titulo}>🍽️ Mi Recetario Personal</Text>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Recetas')} // aún no existe pero lo añadiremos
        >
          <Text style={styles.textoBoton}>Ver Recetas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centro: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    color: '#fff8dc',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#f2a154',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
