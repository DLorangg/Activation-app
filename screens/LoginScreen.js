import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = () => {
    // Validación básica de campos de entrada
    if (!username || !passwd) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    axios
      .post('http://192.168.1.11:7007/login', { username, passwd }) // Cambia la dirección IP y el puerto si es necesario
      .then(response => {
        if (response.data.success) {
          // Inicio de sesión exitoso
          console.log('Inicio de sesión exitoso:', response.data.message);
          navigation.navigate('Button');
        } else {
          // Inicio de sesión fallido, muestra un mensaje de error
          setError('Credenciales incorrectas.');
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        setError('Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={passwd}
        onChangeText={text => setPasswd(text)}
      />
      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
        color="#0E6AB0"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
