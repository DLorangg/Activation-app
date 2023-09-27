import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { verificarCredenciales } from '../database/users';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    verificarCredenciales(username, password, (error, exitoso) => {
      if (error) {
        // Maneja los errores
        console.error('Error al verificar credenciales:', error);
      } else {
        if (exitoso) {
          // El inicio de sesión fue exitoso
          // Realiza acciones necesarias, como la navegación a la página principal
        } else {
          // El inicio de sesión falló, muestra un mensaje de error
          setError('Credenciales incorrectas');
        }
      }
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        value={passwd}
        onChangeText={text => setPasswd(text)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
