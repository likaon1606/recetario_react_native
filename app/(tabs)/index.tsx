// import { useRouter } from 'expo-router';
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <ImageBackground
      source={require('../../assets/images/cocina_fondo_principal.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Mi Recetario Personal</Text>
        <Text style={styles.subtitle}>Organiza tus recetas y planifica tus comidas</Text>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>¿Necesitas un sitio web o app a medida?</Text>
          <Text style={styles.contactText}>Ofrezco desarrollo profesional y personalizado.</Text>

          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/525532604568')} style={styles.whatsappContainer}>
            <Image
              source={require('../../assets/images/whats.png')}
              style={styles.whatsappIcon}
            />
            <Text style={styles.whatsappText}>Contáctame: 5532604568</Text>
          </TouchableOpacity>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6F4E37',
    marginBottom: 24,
    textAlign: 'center',
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
    color: 'blue',
    textAlign: 'center',
    marginBottom: 6,
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  whatsappIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  whatsappText: {
    fontSize: 15,
    color: '#000',
  },
});
