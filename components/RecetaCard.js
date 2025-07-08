import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecetaCard({ receta }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={receta.imagen} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{receta.titulo}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>{receta.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF0E6',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  imagen: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A84E0E',
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
  },
});
