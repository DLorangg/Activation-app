import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import ZonePicker from '../components/ZonePicker'; // Importa el componente ZonePicker que creamos antes

const ButtonScreen = ({ route }) => {
  const { user } = route.params;
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario

  const handleButtonPress = () => {
    setShowForm(true); // Muestra el formulario cuando se presiona el botón
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido {user.name} {user.surname}!</Text>

      {/* Botón con la imagen */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Image source={require('../assets/boton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      {/* Formulario desplegable */}
      {showForm && <ZonePicker />}

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0E6AB0',
  },
  button: {
    marginTop: 20,
  },
  buttonImage: {
    width: 100, // Ajusta el ancho de la imagen según tus preferencias
    height: 100, // Ajusta la altura de la imagen según tus preferencias
  },
});

export default ButtonScreen;
