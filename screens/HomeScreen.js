import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/splash-icon.png')} // tu imagen local
      style={styles.fondo}
      resizeMode="contain"
    >
      <View style={styles.centro}>
        <Text style={styles.texto}>
          App en tiempo real creo
        </Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    borderRadius: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
