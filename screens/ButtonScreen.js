import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const ButtonScreen = ({ route }) => {
  const { user } = route.params;

  const handleShowForm = () => {
    Alert.prompt(
      'Ingrese sus datos',
      null,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Enviar',
          onPress: (data) => {
            // Aquí puedes manejar los datos ingresados por el usuario
            console.log('Datos ingresados:', data);
          },
        },
      ],
      'plain-text', // Tipo de entrada de texto
      '', // Valor inicial del campo de texto
      'numeric' // Teclado numérico
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bienvenido {user.name} {user.surname}!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleShowForm} style={styles.button}>
          <Image source={require('../assets/boton.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0E6AB0',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: 200, // Ancho del botón
    height: 200, // Alto del botón
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default ButtonScreen;
