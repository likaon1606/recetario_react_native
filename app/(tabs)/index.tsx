import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from '../../navigation/StackNavigator';

registerRootComponent(StackNavigator);


export default function Page() {
  return (
      <View style={styles.centro}>
        <Text style={styles.texto}>
          App en tiempo real
        </Text>
      </View>
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
