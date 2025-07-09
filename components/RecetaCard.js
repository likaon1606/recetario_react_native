import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecetaCard({ receta, onEliminar, onEditar }) {
  const [expandida, setExpandida] = useState(false);

  const toggleExpandida = () => {
    setExpandida(!expandida);
  };

  return (
    <TouchableOpacity onPress={toggleExpandida}>
      <View style={styles.card}>
        {receta.imagen ? (
          <Image source={{ uri: receta.imagen }} style={styles.imagen} />
        ) : (
          <View style={[styles.imagen, styles.placeholder]} />
        )}

        <View style={styles.info}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.platilloLabel}>Platillo: </Text>
            <Text style={styles.titulo}>{receta.titulo}</Text>
          </View>

          <Text style={styles.etiqueta}>Ingredientes y preparación:</Text>
          <Text
            style={styles.descripcion}
            numberOfLines={expandida ? undefined : 2}
          >
            {receta.descripcion}
          </Text>

          <View style={styles.botones}>
            <TouchableOpacity onPress={() => onEditar(receta)}>
              <Text style={styles.botonEditar}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEliminar(receta.id)}>
              <Text style={styles.botonEliminar}>🗑 Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#eee',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  platilloLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A84E0E',
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A84E0E',
    marginTop: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  botones: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  botonEditar: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },
  botonEliminar: {
    color: '#E53935',
    fontWeight: 'bold',
  },
});
