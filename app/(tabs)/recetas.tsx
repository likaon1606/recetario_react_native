import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import RecetaCard from '../../components/RecetaCard';

const recetas = [
  {
    id: '1',
    titulo: 'Enchiladas Verdes',
    descripcion: 'Tortillas rellenas de pollo con salsa verde.',
    imagen: require('../../assets/images/enchiladas.jpg'),
  },
  {
    id: '2',
    titulo: 'Tacos de Pastor',
    descripcion: 'Tacos con carne de cerdo marinada y piña.',
    imagen: require('../../assets/images/tacos.jpg'),
  },
];

export default function RecetasScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/fondo_recetas.jpg')}
      style={styles.background}
      resizeMode="contain"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Mis Recetas</Text>

        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecetaCard receta={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
});
