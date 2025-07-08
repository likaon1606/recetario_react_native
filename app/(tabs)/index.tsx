import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/cocina_fondo_principal.jpg')}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Mi Recetario Personal</Text>
        <Text style={styles.subtitle}>
          Organiza tus recetas y planifica tus comidas
        </Text>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>
            ¿Necesitas un sitio web o app a medida?
          </Text>
          <Text style={styles.contactText}>
            ventas@hechoenlinea.com
          </Text>
          <Text style={styles.contactText}>🌐 hechoenlinea.com</Text>
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
    backgroundColor: 'rgba(255, 244, 230, 0.85)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A84E0E',
    marginBottom: 8,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6F4E37',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  },
  contactContainer: {
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  whatsappIcon: {
    fontSize: 18,
    color: '#25D366', // verde WhatsApp
  },
  whatsappText: {
    fontSize: 15,
    color: '#000',
  },
});
