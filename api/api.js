const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa el paquete CORS
const moment = require('moment');

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

app.post('/submit-call', (req, res) => {
  const { selectedCallType, textInputValue, user, selectedZone } = req.body; // Datos del formulario

  // Paso 1: Hacer una consulta para obtener el id del paciente por su DNI
  const DNI = textInputValue;
  const getPacientIdQuery = 'SELECT id FROM pacients WHERE DNI = ?';

  connection.query(getPacientIdQuery, [DNI], (error, results) => {
    if (error) {
      console.error('Error al obtener el id del paciente:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    } else {
      if (results.length > 0) {
        const pacientId = results[0].id;

        // Paso 2: Obtener el ID de áreas basado en el nombre de la zona seleccionada
        const getAreaIdQuery = 'SELECT id FROM areas WHERE name = ?';

        connection.query(getAreaIdQuery, [selectedZone], (error, areaResults) => {
          if (error) {
            console.error('Error al obtener el ID de área:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
          } else {
            if (areaResults.length > 0) {
              const selectedAreaId = areaResults[0].id;

              // Paso 3: Obtener la hora actual en el formato deseado
              const formattedStartHour = moment().format('YYYY-MM-DD HH:mm:ss');

              // Paso 4: Insertar los datos en la tabla calls
              const insertCallQuery = 'INSERT INTO calls (type, status, start_hour, id_users, id_pacient, id_areas) VALUES (?, 1, ?, ?, ?, ?)';
              const values = [selectedCallType, formattedStartHour, user.id, pacientId, selectedAreaId];

              connection.query(insertCallQuery, values, (error, insertResults) => {
                if (error) {
                  console.error('Error al insertar la llamada en la base de datos:', error);
                  res.status(500).json({ success: false, message: 'Error en el servidor' });
                } else {
                  res.json({ success: true, message: 'Llamada registrada exitosamente' });
                }
              });
            } else {
              console.error('Área no encontrada con el nombre proporcionado:', selectedZone);
              res.json({ success: false, message: 'Área no encontrada con el nombre proporcionado' });
            }
          }
        });
      } else {
        console.error('Paciente no encontrado con el DNI proporcionado:', DNI);
        res.json({ success: false, message: 'Paciente no encontrado con el DNI proporcionado' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
