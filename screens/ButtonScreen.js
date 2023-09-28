import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import ZonePicker from '../components/ZonePicker';
import { Picker } from '@react-native-picker/picker';

const ButtonScreen = ({ route }) => {
  const { user } = route.params;
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedCallType, setSelectedCallType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonPress = () => {
    if (!showForm) {
      setShowForm(true);
    } else {
      // Mostrar una alerta con los valores seleccionados
      const message = `Zona: ${selectedZone}\nLlamado: ${selectedCallType}`; // Cambio de orden aquí

      Alert.alert(
        'Confirmación',
        message,
        [
          {
            text: 'Cancelar',
            onPress: () => {
              setShowForm(true); // Vuelve a mostrar el formulario
            },
          },
          {
            text: 'Enviar',
            onPress: () => {
              setShowForm(false); // Oculta el formulario
              setShowAlert(false); // Oculta la alerta
            },
          },
        ]
      );

      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título en la parte superior del centro */}
      <Text style={styles.title}>Bienvenido {user.name} {user.surname}!</Text>

      {/* Botón con la imagen */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Image source={require('../assets/boton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      {/* Formulario desplegable */}
      {showForm && (
        <View style={styles.form}>
          <ZonePicker
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
          />
          <Text>Selecciona el tipo de llamado:</Text>
          <Picker
            selectedValue={selectedCallType}
            onValueChange={(itemValue, itemIndex) => setSelectedCallType(itemValue)}
            style={{ height: 40, width: 200 }} // Ajusta la altura y el ancho según tus necesidades
          >
            <Picker.Item label="-----" value="" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Emergencia" value="Emergencia" />
          </Picker>
        </View>
      )}
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
    marginTop: 15, // Agrega margen superior para "Bienvenido"
    color: '#0E6AB0',
  },
  button: {
    marginTop: 20,
  },
  buttonImage: {
    width: 100,
    height: 100,
  },
  form: {
    alignItems: 'center',
  },
});


export default ButtonScreen;
