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
        const user = results[0];

        // Consulta para obtener información adicional del usuario
        const userInfoQuery = 'SELECT name, surname FROM users WHERE username = ?';
        connection.query(userInfoQuery, [username], (error, userInfoResults) => {
          if (error) {
            console.error('Error al obtener información adicional del usuario:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
          } else {
            if (userInfoResults.length > 0) {
              // Agrega la información adicional del usuario a la respuesta
              user.name = userInfoResults[0].name;
              user.surname = userInfoResults[0].surname;

              res.json({ success: true, message: 'Inicio de sesión exitoso', user });
            }
          }
        });
      } else {
        res.json({ success: false, message: 'Credenciales incorrectas' });
      }
    }
  });
});

app.get('/areas', (req, res) => {
  const areasQuery = 'SELECT name FROM areas'; // Consulta SQL para obtener los nombres de zonas
  connection.query(areasQuery, (error, results) => {
    if (error) {
      console.error('Error al obtener nombres de zonas:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    } else {
      const zoneNames = results.map(result => result.name);
      res.json(zoneNames);
    }
  });
});


app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
