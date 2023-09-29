import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const Alarm = () => {
  const [sound, setSound] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/alarm.mp3'),
      { isLooping: true } // Establece isLooping en true para reproducir en bucle
    );
    setSound(sound);
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const fetchAlarmStatus = async () => {
    try {
      const response = await fetch('http:192.168.1.11:7007/alarm-status');
      const data = await response.json();
      const { success, alarmActive } = data;

      if (success) {
        setAlarmActive(alarmActive);
      }
    } catch (error) {
      console.error('Error al obtener el estado de la alarma:', error);
    }
  };

  useEffect(() => {
    loadSound();
    fetchAlarmStatus();

    // Llamar a fetchAlarmStatus() cada cierto intervalo de tiempo para verificar el estado de la alarma
    const interval = setInterval(() => {
      fetchAlarmStatus();
    }, 5000); // Por ejemplo, cada 5 segundos

    return () => {
      clearInterval(interval);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (alarmActive) {
      playSound();
    } else {
      stopSound();
    }
  }, [alarmActive]);

};

export default Alarm;
