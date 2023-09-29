import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native';
import ZonePicker from '../components/ZonePicker';
import { Picker } from '@react-native-picker/picker';

const ButtonScreen = ({ route }) => {
  const { user } = route.params;
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedCallType, setSelectedCallType] = useState('');
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');

  const handleButtonPress = () => {
    if (!showForm) {
      setShowForm(true);
      setButtonPressCount(0);
    } else {
      if (buttonPressCount === 1) {
        // Si es la segunda vez que se presiona el botón, cierra el formulario
        setShowForm(false);
        setSelectedZone('');
        setSelectedCallType('');
        setButtonPressCount(0);
        setTextInputValue(''); // Limpiar el valor del campo de entrada
      } else {
        // Mostrar una alerta con los valores seleccionados
        const message = `Zona: ${selectedZone}\nLlamado: ${selectedCallType}\nValor numérico: ${textInputValue}`;

        Alert.alert(
          'Confirmación',
          message,
          [
            {
              text: 'Cancelar',
              onPress: () => {
                setShowForm(true); // Vuelve a mostrar el formulario
                setButtonPressCount(0);
              },
            },
            {
              text: 'Enviar',
              onPress: () => {
                setShowForm(false); // Oculta el formulario
                setButtonPressCount(0);
                setTextInputValue(''); // Limpiar el valor del campo de entrada
              },
            },
          ]
        );

        setButtonPressCount(2); // Establece el contador en 2 para indicar la segunda pulsación
      }
    }
  };

  const handleImagePress = () => {
    // Si el formulario está visible, ciérralo
    if (showForm) {
      setShowForm(false);
      setButtonPressCount(0);
    } else {
      // Si el formulario está oculto, muéstralo
      setShowForm(true);
    }
  };

  return (
    <View style={styles.container}>
      {!showForm && ( // Renderiza el texto "Bienvenido" solo si showForm es false
        <Text style={styles.title}>Bienvenido {user.name} {user.surname}!</Text>
      )}

      {/* Botón con la imagen */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleImagePress}
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

          {/* Campo de entrada para el valor numérico */}
          <TextInput
            placeholder="DNI paciente"
            style={styles.input}
            onChangeText={setTextInputValue}
            value={textInputValue}
            maxLength={8} // Limitar la longitud del texto a 8 caracteres
            keyboardType="numeric" // Teclado numérico
          />

          {/* Botón "Activar" */}
          <TouchableOpacity
            style={styles.activateButton}
            onPress={handleButtonPress}
          >
            <Text style={styles.activateButtonText}>Activar</Text>
          </TouchableOpacity>
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
    marginTop: 15,
    color: '#0E6AB0',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
  buttonImage: {
    width: 125,
    height: 125,
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 160,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  activateButton: {
    backgroundColor: '#0E6AB0', 
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10, 
    marginBottom: 5, 
  },
  activateButtonText: {
    marginBottom: 5,
    marginTop: 5,
    color: '#000', // Texto negro
    fontWeight: 'bold',
  },
});

export default ButtonScreen;
