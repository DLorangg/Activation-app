import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Importa StyleSheet
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ZonePicker = ({ selectedZone, onZoneChange }) => {
  const [zoneNames, setZoneNames] = useState([]);

  useEffect(() => {
    // Obtener los nombres de zonas desde la API
    axios.get('http://192.168.1.38:7007/areas')
      .then(response => {
        setZoneNames(response.data);
      })
      .catch(error => {
        console.error('Error al obtener nombres de zonas:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona una zona:</Text>
      <Picker
        style={styles.picker} // Aplica un estilo al Picker
        selectedValue={selectedZone}
        onValueChange={(itemValue, itemIndex) => onZoneChange(itemValue)}
      >
        <Picker.Item label="-----" value="" />
        {zoneNames.map((zoneName, index) => (
          <Picker.Item key={index} label={zoneName} value={zoneName} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Agrega espacio en los lados
  },
  label: {
    fontSize: 18, 
    color: '#0E6AB0', 
    textAlign: 'center', 
    marginBottom: 10,
  },
  picker: {
    width: 200
  },
});

export default ZonePicker;
