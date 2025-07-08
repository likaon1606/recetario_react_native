import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/cocina_fondo_principal.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Mi Recetario Personal</Text>
        <Text style={styles.subtitle}>Organiza tus recetas y planifica tus comidas</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/recetas')}>
            <Text style={styles.buttonText}>Ver Recetas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/agregar')}>
            <Text style={styles.buttonText}>Agregar Receta</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={() => router.push('/calendario')}>
            <Text style={styles.buttonText}>Calendario Semanal</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 244, 230, 0.85)', // color crema semitransparente
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A84E0E', // marrón cálido
    marginBottom: 8,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6F4E37', // marrón oscuro suave
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#E38B29', // naranja suave
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'sans-serif-medium',
  },
});
