const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa el paquete CORS

const app = express();
const port = 7007; // Puerto para tu API

// Cadena de conexión a la base de datos en la nube (proporcionada por Railway)
const dbConfig = {
  host: 'containers-us-west-46.railway.app',
  user: 'root',
  password: 'sc6IifdQ8D2riPihXkGp',
  database: 'railway',
  port: 6573, // Puerto de la base de datos en la nube
};

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
  console.log('Conexión exitosa a la base de datos MySQL en la nube');
});

// Ruta para manejar la solicitud de inicio de sesión
app.post('/login', (req, res) => {
  const { username, passwd } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND passwd = ?';

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
