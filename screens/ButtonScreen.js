import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native';
import ZonePicker from '../components/ZonePicker';
import { Picker } from '@react-native-picker/picker';
import 'expo-av';
import Alarm from '../components/Alarm';

const ButtonScreen = ({ route }) => {
  const { user } = route.params;
  const [showForm, setShowForm] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedCallType, setSelectedCallType] = useState('');
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');

  const handleButtonPress = async () => {
    if (!showForm) {
      setShowForm(true);
      setButtonPressCount(0);
    } else {
      if (buttonPressCount === 1) {
        setShowForm(false);
        setSelectedZone('');
        setSelectedCallType('');
        setButtonPressCount(0);
        setTextInputValue('');
      } else {
        // Envía el formulario y registra la llamada en la base de datos
        const formData = {
          selectedCallType,
          textInputValue,
          user,
          selectedZone,
        };

        try {
          const response = await fetch('http://192.168.1.11:7007/submit-call', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (data.success) {
            // Llamada registrada con éxito, puedes mostrar un mensaje de  confirmación
            Alert.alert('Éxito', 'Llamada registrada con éxito');
          } else {
            Alert.alert('Error', data.message);
          }

          setShowForm(false);
          setButtonPressCount(0);
          setTextInputValue('');
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
          Alert.alert('Error', 'Hubo un problema al registrar la llamada');
        }
      }
    }
  };

  const handleImagePress = () => {
    if (showForm) {
      setShowForm(false);
      setButtonPressCount(0);
    } else {
      setShowForm(true);
    }
  };

  return (
    <View style={styles.container}>
      <Alarm />
      {!showForm && (
        <Text style={styles.title}>Bienvenido {user.name} {user.surname}!</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleImagePress}
      >
        <Image source={require('../assets/boton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

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
            style={{ height: 40, width: 200 }}
          >
            <Picker.Item label="-----" value="" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Emergencia" value="Emergencia" />
          </Picker>

          <TextInput
            placeholder="DNI paciente"
            style={styles.input}
            onChangeText={setTextInputValue}
            value={textInputValue}
            maxLength={8}
            keyboardType="numeric"
          />

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
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ButtonScreen;
