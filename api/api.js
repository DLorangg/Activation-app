const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete CORS

const app = express();
const port = 7007; // Puerto para tu API

const dbConfig = {
  host: '192.168.1.11', // Dirección IP de tu servidor MySQL
  user: 'root', // Usuario de MySQL
  password: '', // Contraseña de MySQL (deja esto en blanco si no tienes una contraseña)
  database: 'codigo_azul', // Nombre de la base de datos MySQL
  port: 3306, // Puerto de MySQL (por defecto 3306)
};

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para manejar la solicitud de inicio de sesión
app.post('/login', (req, res) => {
  const { username, passwd } = req.body;

  if (!username || !passwd) {
    res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
    return;
  }

  const query = 'SELECT * FROM users WHERE username = ? AND passwd = ?'; // Asegúrate de que coincida con tu base de datos

  connection.query(query, [username, passwd], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta SQL:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    } else {
      if (results.length > 0) {
        res.json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        res.json({ success: false, message: 'Credenciales incorrectas' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
