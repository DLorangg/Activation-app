import db from './bd';

// Función para verificar las credenciales del usuario
function verificarCredenciales(username, passwd, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND passwd = ?',
      [username, password],
      (_, { rows }) => {
        if (rows.length > 0) {
          // Las credenciales son válidas
          callback(null, true);
        } else {
          // Las credenciales son inválidas
          callback(null, false);
        }
      },
      (_, error) => {
        console.error('Error al verificar credenciales:', error);
        callback(error, null);
      }
    );
  });
}

export { verificarCredenciales };
