import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ZonePicker = () => {
  const [zoneNames, setZoneNames] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');

  useEffect(() => {
    // Obtener los nombres de zonas desde la API
    axios.get('http://192.168.1.11:7007/areas') // Cambia la dirección IP a la tuya
      .then(response => {
        setZoneNames(response.data);
      })
      .catch(error => {
        console.error('Error al obtener nombres de zonas:', error);
      });
  }, []);

  return (
    <View>
      <Text>Selecciona una zona:</Text>
      <Picker
        selectedValue={selectedZone}
        onValueChange={(itemValue, itemIndex) => setSelectedZone(itemValue)}
      >
        {zoneNames.map((zoneName, index) => (
          <Picker.Item key={index} label={zoneName} value={zoneName} />
        ))}
      </Picker>
      <Text>Zona seleccionada: {selectedZone}</Text>
    </View>
  );
};

export default ZonePicker;
