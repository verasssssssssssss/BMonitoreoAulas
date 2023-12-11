const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { storage } = require('./firebase');
const { v4: uuidv4 } = require('uuid');
const schedule = require('node-schedule');

/*
const OAuth2 = google.auth.OAuth2;
// const CLIENT_ID = "501116274914-hm1ghv43pdfcb7jhnh9uhonils0lvib8.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN = "1//04Aj8RZZ8Eal-CgYIARAAGAQSNwF-L9IrLOCADbAnVDP4ej8IgpMzlydO_fVwAPp7FRh3Fsfi4a4b9KatPfS7KP1y9ntakX01Jac";


const accountTransport = require("./account_transport.json");

const mail_monitoreo = async () => {
  return new Promise((resolve, reject) => {
    const oauth2Client = new OAuth2(
      accountTransport.auth.clientId,
      accountTransport.auth.clientSecret,
      "https://developers.google.com/oauthplayground",
    );

    oauth2Client.setCredentials({
      refresh_token: accountTransport.auth.refreshToken,
      tls: {
        rejectUnauthorized: false
      }
    });

    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      } else {
        accountTransport.auth.accessToken = token;
        const transport = nodemailer.createTransport(accountTransport);
        resolve(transport);
      }
    });
  });
};




// const oauth2Client = new OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// const accessToken = oauth2Client.getAccessToken();
// const smtpTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "monitoreoaulas@gmail.com",
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: accessToken,
//   }
// });



const horaEjecucion = '00:00:00';
const ahora = new Date();
const horaDeseada = new Date(ahora.toDateString() + ' ' + horaEjecucion);
let tiempoRestante = horaDeseada - ahora;
if (tiempoRestante < 0) {
  tiempoRestante += 24 * 60 * 60 * 1000;
}

setTimeout(realizarConsulta, tiempoRestante);

function realizarConsulta() {
  const sql = 'UPDATE sede SET Activa = 1';
  mc.query(sql, (error, results) => {
    if (error) {
      console.error(error);
    } else {
    }
  });
}

const rangosDeTiempo = [
  { fin: '08:31' },
  { fin: '09:11' },
  { fin: '10:01' },
  { fin: '10:41' },
  { fin: '11:31' },
  { fin: '12:11' },
  { fin: '13:01' },
  { fin: '13:41' },

  { fin: '14:31' },
  { fin: '15:11' },
  { fin: '16:01' },
  { fin: '16:41' },
  { fin: '17:31' },
  { fin: '18:11' },
  { fin: '19:01' },
  { fin: '19:41' },
];


const diasSemana = [1, 2, 3, 4, 5];
rangosDeTiempo.forEach((rango, index) => {
  const horaFin = rango.fin.split(':');
  const regla = new schedule.RecurrenceRule();
  regla.dayOfWeek = diasSemana;
  regla.hour = parseInt(horaFin[0], 10);
  regla.minute = parseInt(horaFin[1], 10);
  schedule.scheduleJob(regla, () => {
    ejecutarTarea();
  });
});

function ejecutarTarea() {
  mc.query('SELECT COUNT(DISTINCT IdSensor) AS Total FROM datos;', function (error, countt, fields) {
    if (error) throw error;
    for (let i = 1; i < countt[0]['Total'] + 1; i++) {
      mc.query('SELECT datos.IdDatos, datos.Humedad, datos.NivelesDeCO2, datos.Temperatura, datos.Movimiento FROM datos INNER JOIN sensor ON datos.IdSensor = sensor.IdSensor WHERE datos.IdSensor = ? ORDER BY Fecha DESC LIMIT 2', i, function (error, results, fields) {
        if (error) throw error;
        if (results[0].Movimiento == 0 && results[0].NivelesDeCO2 < results[1].NivelesDeCO2 && results[0].Temperatura < results[1].Temperatura && results[0].Humedad <= results[1].Humedad) {
          mc.query('UPDATE datos SET Reportado=0, Correcto = 1 WHERE IdDatos = ?', results[0].IdDatos, function (error, resultss, fields) {
            if (error) throw error;
          });
        }
      });
    }
  });
}

//ID = ? - POST = enviar correo de desuso de aula
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//CORS middleware
app.use(function (req, res, next) {
  //Enabling CORS //["http://localhost:4200","https://cerulean-tarsier-37d919.netlify.app"]
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});



const mc = mysql.createConnection({
  host: '172.17.0.26',
  port: 3306,
  user: 'root',
  password: 'monitoreo_admin',
  database: 'psensores',
});



mc.connect(error => {
  if (error) throw error;
  console.log("Conectado exitosamente a la base de datos.");
});



/*
  host: '172.17.0.26',
  port: 3306,
  user: 'root',
  password: 'monitoreo_admin',
  database: 'psensores',

  host: "bum5btaryskyoamzkj0m-mysql.services.clever-cloud.com",
  user: "u7y6gx4q2whv0mav",
  password: "iuglVVQCQWMTqqIZgLoX",
  database: "bum5btaryskyoamzkj0m",

  host: "localhost",
  user: "root",
  password: "",
  database: "psensores",
*/

//ID = 1 - POST = Iniciar sessión *
app.post("/usuario/session", (req, res) => {
  let Mail = req.body.Mail;
  let Contrasenia = req.body.Contrasenia;
  mc.query("SELECT * FROM usuario WHERE Mail= ?", Mail, function (err, results, fields) {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar usuario",
        errors: err,
      });
    }
    if (!results.length) {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales incorrectas",
        errors: err,
      });
    }
    if (bcrypt.compareSync(Contrasenia, results[0].Contrasenia)) {
      let SEED = 'esta-es-una-semilla';
      let token = jwt.sign({ usuario: results[0].Contrasenia }, SEED, { expiresIn: 86400 });
      return res.status(200).json({
        ok: true,
        mensaje: "usuario logueado correctamente",
        data: results,
        token: token
      })
    } else {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales incorrectas",
        errors: err
      })
    }
  }
  );
});

//ID = 2- GET = listado de datos sobre Temperatura y Humedad de una determinada aula
app.get('/datos/tempHum/:idAula', function (req, res) {
  let idAula = req.params.idAula;
  mc.query('SELECT datos.Fecha, datos.Temperatura, datos.Humedad FROM datos INNER JOIN sensor ON datos.IdSensor = sensor.IdSensor WHERE sensor.IdAula = ? ORDER BY Fecha DESC LIMIT 10', idAula, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de datos sobre Temperatura y Humedad de una determinada aula'
    });
  });
});

//ID = 3 - GET = listado de datos sobre CO2 y tvoc de una determinada aula
app.get('/datos/co2tvoc/:idAula', function (req, res) {
  let idAula = req.params.idAula;
  //SELECT Fecha,NivelesDeCO2, Tvoc FROM datos WHERE DATE(Fecha) = CURDATE() ORDER BY Fecha DESC LIMIT 10
  mc.query('SELECT datos.Fecha, datos.NivelesDeCO2, datos.Tvoc FROM datos INNER JOIN sensor ON datos.IdSensor = sensor.IdSensor WHERE sensor.IdAula = ? ORDER BY Fecha DESC LIMIT 7', idAula, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de datos sobre CO2 y tvoc sin sala'
    });
  });
});

//ID = 4 - GET = listado de dato de IntensidadLuminica determinada aula
app.get('/datos/Iluminica/:idAula', function (req, res) {
  let idAula = req.params.idAula;
  //SELECT Fecha,NivelesDeCO2, Tvoc FROM datos WHERE DATE(Fecha) = CURDATE() ORDER BY Fecha DESC LIMIT 10
  mc.query('SELECT datos.Fecha, datos.IntensidadLuminica FROM datos INNER JOIN sensor ON datos.IdSensor = sensor.IdSensor WHERE sensor.IdAula = ? ORDER BY Fecha DESC LIMIT 10', idAula, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de datos intensidad luminica sin sala'
    });
  });
});

//ID = 5 - POST = subir captura fotografica de sensor
app.use('/upload', express.raw({ type: 'image/*', limit: '10mb' }));

app.post('/upload', async (req, res) => {
  const bucket = storage.bucket('gs://bmonitoreo-d0403.appspot.com');
  const nombreArchivo = uuidv4() + '.jpg';

  try {
    const file = bucket.file(nombreArchivo);
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'image/jpeg'
      }
    });

    stream.on('error', (err) => {
      console.error('Error al subir el archivo:', err);
      res.status(500).send('Error al subir el archivo');
    });

    stream.on('finish', async () => {
      // Hacer el archivo público
      await file.makePublic();

      // Obtener la URL pública
      const url = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      // Enviar la URL como respuesta
      res.status(200).send({ message: 'Archivo subido con éxito', url: url });
    });

    stream.end(req.body);
  } catch (error) {
    console.error('Error en el catch:', error);
    res.status(500).send('Error al procesar la solicitud');
  }
});

//ID = 6 - POST = recopliar datos de los sensores
app.post('/enviar-datos', (req, res) => {
  const temperature = req.body.temperature;
  const humidity = req.body.humidity;
  const luminosity = req.body.luminosity; // Valor de intensidad lumínica
  const co2Level = req.body.co2Level;     // Valor de niveles de CO2
  const tvoc = req.body.tvoc;             // Valor de TVOC enviado por el sensor de CO2 y TVOC
  const move = req.body.movimiento;
  const foto = req.body.imageUrl;
  const idSensor = req.body.idSensor;     // Obtener el ID del sensor desde el request body

  // Inserta los datos en la tabla "datos"
  const insertQuery = `
    INSERT INTO datos (
      Fecha, 
      Reportado, 
      Correcto, 
      IntensidadLuminica, 
      NivelesDeCO2, 
      Tvoc, 
      Temperatura, 
      Humedad,
      Movimiento, 
      CapturaFotografica, 
      IdSensor
    ) VALUES (NOW(), 0, 0, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Valores para la inserción en la base de datos
  const values = [luminosity, co2Level, tvoc, temperature, humidity, move, foto, idSensor];

  mc.query(insertQuery, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al insertar datos' });
    } else {
      res.json({ message: 'Datos recibidos y almacenados correctamente.' });
    }
  });
});

app.use('/', (req, res, next) => {
  let token = req.query.token;
  let SEED = "esta-es-una-semilla";
  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: "Token incorrecto",
        errors: err,
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
});

//ID = 7 - POST = crear un reprote de desuso de aula 
app.post('/reporte/crear/', function (req, res) {
  let fecha = new Date();
  fecha.setHours(fecha.getHours() - 3)

  let datosReporte = {
    IdCurso: req.body.IdCurso,
    FechaReporte: fecha,
    IdCarrera: req.body.IdCarrera,
    IdUsuario: req.body.IdUsuario,
    IdAula: req.body.IdAula,
    IdDatos: req.body.IdDatos,
  };
  if (mc) {
    mc.query("INSERT INTO reporte SET ?", datosReporte, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 8 - POST = enviar correo de desuso de aula
app.post("/EnviarCorreo/", async (req, res) => {

  try {
    const smtpTransport = await mail_monitoreo();

    let datoscorreo = {
      to: req.body.to,
      NomDirector: req.body.NomDirector,
      ApeDirector: req.body.ApeDirector,
      NomSede: req.body.NomSede,
      NomCurso: req.body.NomCurso,
      Codigo: req.body.Codigo,
      FechaReporte: req.body.FechaReporte,
      NomCarrera: req.body.NomCarrera,
      NomEncargado: req.body.NomEncargado,
      NomAula: req.body.NomAula,
      CapturaFotografica: req.body.CapturaFotografica,
    };


    if (!datoscorreo.to) {
      return res.status(400).send("Ingrese un correo destinatario válido.");
    }


    let msg = `<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>

  .justificado {
    text-align: justify;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }
  
  .encabezado {
    text-align: center;
    background-color: #333;
    color: #fff;
    padding: 10px 0;
  }
  
  .contenido {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .contenido p {
    margin: 0 0 10px;
    line-height: 1.4;
  }
  
  .imagen-centrada {
    display: block;
    margin: 0 auto;
    max-width: 70%;
    height: auto;
    margin-top: 20px;
  }
  
  .pie-pagina {
    text-align: center;
    font-style: italic;
    margin-top: 20px;
  }
  </style>
</head>
<body>
  <div class="justificado">
    <div class="encabezado">
      <h1>Asunto: Reporte de Desuso de Aula de Clases</h1>
    </div>
    <div class="contenido">
      <p>Estimada ${datoscorreo.NomDirector} ${datoscorreo.ApeDirector} </p>
      <p>Se notifica que en la sala ${datoscorreo.NomAula} del campus ${datoscorreo.NomSede},
      reservada para ${datoscorreo.NomCurso} (${datoscorreo.Codigo})
      de la carrera ${datoscorreo.NomCarrera} no registra asistencia el dia ${datoscorreo.FechaReporte}.</p>
      <p>Esta información fue ratificada por el encargado de aula ${datoscorreo.NomEncargado}, 
      se adjunta captura fotográfica del aula en el momento de desusos como evidencia.</p>
      <img class="imagen-centrada" src=${datoscorreo.CapturaFotografica}>
      <p class="pie-pagina">Sistema de monitoreo de aulas universidad del BIO-BIO.</p>
    </div>
  </div>
</body>
</html>`;

    const mailOptions = {
      from: "Sistema de monitoreo de aulas UBB <monitoreoaulas@gmail.com>",
      to: datoscorreo.to,
      subject: "Notificacion de desuso de aula " + datoscorreo.NomAula,
      generateTextFromHTML: true,
      html: msg
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        res.status(500).send("Error al enviar el correo.");
      } else {
        res.send("Correo enviado correctamente.");
      }
      smtpTransport.close();
    });

  } catch (error) {
    console.error("Error al obtener el transporte SMTP:", error);
    res.status(500).send("Error al obtener el transporte SMTP.");
  }
});

//ID = 9 - GET = Nombre de la Ciudad segun id *
app.get('/sede/obtener/', function (req, res) {
  let IdCiudad = req.query.IdCiudad;
  mc.query('SELECT ciudad.NomCiudad FROM ciudad WHERE ciudad.IdCiudad = ?', IdCiudad, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Nombre de la ciudad segun id'
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ID = random - GET = Cursos existentes en la sede
app.get('/curso/obtener/xsede/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT curso.IdCurso, curso.NomCurso ,curso.IdCarrera FROM curso INNER JOIN carrera ON curso.IdCarrera = carrera.IdCarrera INNER JOIN posee ON curso.IdCarrera = posee.IdCarrera AND posee.IdSede = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Carreras de segun la Sede'
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ID = random - POST = crear area de trabajo *
app.post('/reserva/crear/', function (req, res) {
  let datosReserva = {
    DiaClases: req.body.DiaClases,
    EnUso: 1,
    FechaLimite: req.body.FechaLimite,
    IdCurso: req.body.IdCurso,
    IdAula: req.body.IdAula,
    IdSede: req.body.IdSede,
  };

  let IdBloqueInicio = req.body.IdBloqueInicio;
  let IdBloqueFin = (req.body.IdBloqueFin + IdBloqueInicio);

  let datosContiene = {
    IdReserva: 0,
    IdBloque: 0,
  };
  if (mc) {
    mc.query("INSERT INTO reserva SET ?", datosReserva, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      } else {
        mc.query("SELECT IdReserva FROM reserva ORDER BY IdReserva DESC LIMIT 1", function (error, resultss) {
          if (error) {
            res.status(500).json({ "Mensaje": "Error" });
          } else {
            datosContiene.IdReserva = resultss[0].IdReserva;
            for (IdBloqueInicio; IdBloqueInicio < IdBloqueFin; IdBloqueInicio++) {
              datosContiene.IdBloque = IdBloqueInicio;
              mc.query("INSERT INTO contiene SET ?", datosContiene, function (error, results) {
                if (error) {
                  res.status(500).json({ "Mensaje": "Error" });
                }
              });
            }
            return res.status(200).json({ "Mensaje": "Reserva ingresada" });
          }
        });
      }
    });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ID = random - DELETE = eleminar reserva por bloque
app.delete('/reserva/eliminar/bloque/', function (req, res) {
  let IdReserva = req.query.IdReserva;
  let IdBloque = req.query.IdBloque;
  mc.query('DELETE FROM contiene WHERE IdReserva = ? AND IdBloque = ?', [IdReserva, IdBloque], function (errorr, results, fields) {
    if (errorr) {
      res.status(500).json({ "Mensaje": "Error" });
    } else {
      res.status(200).json({ "Mensaje": "Reserva eliminada" });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ID = random - DELETE = eleminar reserva
app.delete('/reserva/eliminar/', function (req, res) {
  let IdReserva = req.query.IdReserva;
  mc.query('DELETE FROM reserva WHERE IdReserva = ?', IdReserva, function (error, results, fields) {
    if (error) {
      res.status(500).json({ "Mensaje": "Error" });
    }else{
      res.status(200).json({ "Mensaje": "Reserva eliminada" });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ID = random - GET = obtener datos de los sensores
app.get('/sensores/monitorear/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT sensor.IdSensor, aula.NomAula, datos.Fecha, datos.IntensidadLuminica, datos.NivelesDeCO2, datos.Tvoc, datos.Temperatura, datos.Humedad, datos.Movimiento FROM sensor INNER JOIN ( SELECT IdSensor, MAX(Fecha) AS MaxFecha FROM datos GROUP BY IdSensor ) ultima_fecha ON sensor.IdSensor = ultima_fecha.IdSensor INNER JOIN datos ON sensor.IdSensor = datos.IdSensor AND datos.Fecha = ultima_fecha.MaxFecha INNER JOIN aula ON sensor.IdAula = aula.IdAula INNER JOIN areatrabajo ON aula.IdArea = areatrabajo.IdArea INNER JOIN sede ON sede.IdSede = areatrabajo.IdSede WHERE aula.Visible = 1 AND areatrabajo.Visible = 1 AND sede.IdSede = ? LIMIT 4', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Carreras de segun la Sede'
    });
  });
});

//ID = 10 - GET = listado de sedes segun la ciudad *
app.get('/campus/listado/', function (req, res) {
  let IdCiudad = req.query.IdCiudad;
  mc.query('SELECT sede.IdSede,sede.NomSede, sede.Acronimo, sede.Activa, sede.FechaActivacion FROM sede INNER JOIN ciudad ON ciudad.IdCiudad = sede.IdCiudad AND ciudad.IdCiudad = ?', IdCiudad, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Listado de sedes segun la ciudad'
    });
  });
});

//ID = 11 - PUT = cambiar sede de encargado
app.put('/cambiarde/sede/', function (req, res) {
  let IdUsuario = req.body.IdUsuario;
  let IdSede = req.body.IdSede;
  mc.query('UPDATE usuario SET  IdSede = ? WHERE IdUsuario = ?', [IdSede, IdUsuario], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      message: 'Sede del encargado actualizadas'
    });
  });
});

//ID = 12 - GET = Datos de usuario segun segun id *
app.get('/usuario/obtener/', function (req, res) {
  let IdUsuario = req.query.IdUsuario;
  mc.query('SELECT IdUsuario,NomUsuario, ApeUsuario, Fotografia, Mail, Contrasenia  FROM usuario WHERE IdUsuario = ?', IdUsuario, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Datos usuario segun id'
    });
  });
});

//ID = 13 - GET = Datos de encargado de aula segun id *
app.get('/encargado/obtener/', function (req, res) {
  let IdCiudad = req.query.IdCiudad;
  mc.query('SELECT IdUsuario,NomUsuario,ApeUsuario,Fotografia,Mail,Contrasenia FROM usuario WHERE IdCiudad = ? AND IdRol = 2', IdCiudad, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Datos de encargado de aula segun la ciudad'
    });
  });
});

//ID = 14 - PUT = Editar Usuario
app.put('/usuario/editar/', (req, res) => {
  const body = {
    IdUsuario: req.body.IdUsuario,
    NomUsuario: req.body.NomUsuario,
    ApeUsuario: req.body.ApeUsuario,
    Fotografia: req.body.Fotografia,
    Mail: req.body.Mail,
    Contrasenia: req.body.Contrasenia,
  };
  mc.query("UPDATE usuario SET NomUsuario=?,ApeUsuario=?,Fotografia=?,Mail=?,Contrasenia=? WHERE IdUsuario  = ?", [body.NomUsuario, body.ApeUsuario, body.Fotografia, body.Mail, body.Contrasenia, body.IdUsuario], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "Todas las área que tenian al encargado con id = " + body.IdUsuario + " ha quedado sin encargado" });
  });
});

//ID = 15 - GET = listado de areas de trabajo segunn la sede * ------------------cambio-----listo
app.get('/area/listado/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT ar.IdArea,ar.NomArea FROM areatrabajo AS ar WHERE ar.IdSede = ? AND ar.Visible = 1', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Áreas de trabajo registradas en la sede'
    });
  });
});

//ID = 16 - GET = listado de todas las aulas de un área *
app.get('/aula/listado/', function (req, res) {
  let IdArea = req.query.IdAreasDeTrabajo;
  mc.query('SELECT aula.IdAula, aula.NomAula, aula.CantidadAlumnos, sensor.IdSensor FROM aula LEFT JOIN sensor ON sensor.IdAula = aula.IdAula WHERE IdArea = ? AND aula.Visible = 1', IdArea, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todas las aulas de un área'
    });
  });
});

//ID = 17 - GET = listado de todas las aulas de un área *
app.get('/aula/listado/sede/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT aula.IdAula, aula.NomAula FROM aula INNER JOIN areatrabajo ON aula.IdArea=areatrabajo.IdArea AND aula.Visible = 1 AND areatrabajo.IdSede= ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todas las aulas de una sede'
    });
  });
});

//ID = 18 - GET = Obtner datos para correo
app.get('/correo/Obtener/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT sede.NomSede, usuario.NomUsuario, usuario.ApeUsuario, usuario.Mail FROM ciudad INNER JOIN sede ON ciudad.IdCiudad = sede.IdCiudad INNER JOIN usuario ON usuario.IdCiudad = ciudad.IdCiudad WHERE sede.IdSede = ? AND usuario.IdRol=1', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Listado de sedes segun la ciudad'
    });
  });
});
//ID = 19 - POST = crear encargado de aula 
app.post('/encargado/crear/', function (req, res) {
  let datosEncargado = {
    NomUsuario: req.body.NomUsuario,
    ApeUsuario: req.body.ApeUsuario,
    Mail: req.body.Mail,
    Contrasenia: bcrypt.hashSync(req.body.Contrasenia, 10),
    IdRol: 2,
    IdCiudad: req.body.IdCiudad,
    Fotografia: req.body.Fotografia,
  };
  if (mc) {
    mc.query("INSERT INTO usuario SET ?", datosEncargado, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 20 - PUT = editar datos de encargado de aula 
app.put('/encargado/editar/', (req, res) => {
  let IdUsuario = req.body.IdUsuario;
  let datosEncargado = {
    NomUsuario: req.body.NomUsuario,
    ApeUsuario: req.body.ApeUsuario,
    Mail: req.body.Mail,
    Contrasenia: req.body.Contrasenia,
    IdSede: req.body.IdSede,
    Fotografia: req.body.Fotografia,
  };
  if (!IdUsuario) {
    return res.status(400).send({ message: 'Debe proveer el id de una usuario existente' });
  }
  mc.query("UPDATE usuario SET ? WHERE IdUsuario = ?", [datosEncargado, IdUsuario], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El encargado de aula con id = " + IdUsuario + " ha sido actualizado" });
  });
});

//ID = 21 - PUT = eliminar encargado de aula *
app.put('/encargado/eliminar/', (req, res) => {
  let IdUsuario = req.body.IdUsuario;

  mc.query("UPDATE usuario SET IdRol=4 WHERE IdUsuario = ?", IdUsuario, function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El encargado de aula con id = " + IdUsuario + " ha sido eliminado" });
  });
});

//ID = 22 - POST = crear area de trabajo *
app.post('/area/crear/', function (req, res) {
  let datosAreaDeTrabajo = {
    NomArea: req.body.NomArea,
    IdSede: req.body.IdSede,
    Visible: 1,
  };
  if (mc) {
    mc.query("INSERT INTO areatrabajo SET ?", datosAreaDeTrabajo, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 23 - PUT = editar area de trabajo                         
app.put('/area/editar/', (req, res) => {
  let IdArea = req.body.IdArea;
  let DatosArea = {
    NomArea: req.body.NomArea,
  };
  if (!IdArea) {
    return res.status(400).send({ message: 'Debe proveer el id de una usuario existente' });
  }
  mc.query("UPDATE areatrabajo SET ? WHERE IdArea = ?", [DatosArea, IdArea], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El area de trabajo con id = " + IdArea + " ha sido actualizado" });
  });
});

//ID = 24 - PUT = "Elminar" área de trabajo *
app.put('/area/eliminar/', (req, res) => {
  let IdArea = req.body.IdArea;
  let DatosArea = {
    Visible: 0,
  };
  if (!IdArea) {
    return res.status(400).send({ message: 'Debe proveer el id de una usuario existente' });
  }
  mc.query("UPDATE areatrabajo SET ? WHERE IdArea = ?", [DatosArea, IdArea], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El area de trabajo con id = " + IdArea + " ha sido actualizado" });
  });
});

//ID = 25 - POST = Registar una nueva aula  *
app.post('/aula/crear/', function (req, res) {
  let datosAula = {
    NomAula: req.body.NomAula,
    IdArea: req.body.IdArea,
    CantidadAlumnos: req.body.CantidadAlumnos,
    Visible: 1,
  };
  if (mc) {
    mc.query("INSERT INTO aula SET ?", datosAula, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 26 - PUT = editar aula *
app.put('/aula/editar/', (req, res) => {
  let IdAula = req.body.IdAula;
  let datosAula = {
    NomAula: req.body.NomAula,
    CantidadAlumnos: req.body.CantidadAlumnos
  };
  if (!IdAula) {
    return res.status(400).send({ message: 'Debe proveer el id de una aula existente' });
  }
  mc.query("UPDATE aula SET ? WHERE IdAula = ?", [datosAula, IdAula], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El aula con id = " + IdAula + " ha sido actualizado" });
  });
});

//ID = 27 - PUT = eliminar aula           
app.put('/aula/eliminar/', (req, res) => {
  let IdAula = req.body.IdAula;
  let datosAula = {
    Visible: 0,
  };
  if (!IdAula) {
    return res.status(400).send({ message: 'Debe proveer el id de una aula existente' });
  }
  mc.query("UPDATE aula SET ? WHERE IdAula = ?", [datosAula, IdAula], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El aula con id = " + IdAula + " ha sido actualizado" });
  });
});

//ID = random - 28 = obtener todas las reservas de una aula                            
app.get('/reserva/poraula/', function (req, res) {
  let IdAula = req.query.IdAula;
  mc.query('SELECT reserva.IdReserva, reserva.DiaClases, reserva.IdAula, reserva.FechaLimite, curso.IdCurso, curso.NomCurso, curso.NomProfesor, curso.Codigo FROM reserva INNER JOIN curso ON reserva.IdCurso = curso.IdCurso AND reserva.IdAula = ? WHERE reserva.FechaLimite >= CURDATE()', IdAula, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'todas las reservas del aula con id ' + IdAula
    });
  });
});

//ID = 29 - GET = obtener todos los bloques de una reserva                         
app.get('/bloque/obtener/', function (req, res) {
  let Idreserva = req.query.IdReserva;
  mc.query('SELECT IdBloque FROM contiene WHERE IdReserva = ?', Idreserva, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'todas los bloques pedagogico de una reserva con id ' + Idreserva
    });
  });
});

//ID = 30 - GET = obtener alerta de desuso de aula       
app.post('/alerta/obtener/', function (req, res) {
  let IdSede = req.body.IdSede;
  mc.query('SELECT aula.IdAula,aula.NomAula,datos.CapturaFotografica,datos.IdDatos, datos.Fecha FROM areatrabajo INNER JOIN aula ON areatrabajo.IdArea = aula.IdArea AND areatrabajo.IdSede = ? INNER JOIN sensor ON aula.IdAula = sensor.IdAula INNER JOIN datos ON sensor.IdSensor = datos.IdSensor AND datos.Reportado = 0 AND datos.Correcto = 1 ', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      dataLenghy: results.length,
      data: results,
      message: 'Obtener alerta de desuso de aula'
    });
  });
});

//ID = 31 - GET = obtener datos del aula en desuso       
app.get('/reporte/datos/', function (req, res) {
  let Dia = req.query.Dia;
  let IdAula = req.query.IdAula;
  let IdBloque = req.query.IdBloque;
  mc.query('SELECT curso.IdCurso, curso.NomCurso,curso.Codigo,carrera.IdCarrera, carrera.NomCarrera FROM  contiene  INNER JOIN reserva on contiene.IdReserva = reserva.IdReserva AND reserva.DiaClases = ? AND reserva.IdAula = ? INNER JOIN curso ON reserva.IdCurso = curso.IdCurso INNER JOIN carrera ON carrera.IdCarrera = curso.IdCarrera WHERE contiene.IdBloque=?', [Dia, IdAula, IdBloque], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      dataLenghy: results.length,
      data: results,
      message: 'obtener datos del aula en desuso'
    });
  });
});

//ID = 32 - PUT = Afirmar o negar alerta de desuso de aula 
app.put('/alerta/validar/', function (req, res) {
  let IdDatos = req.body.IdDatos;
  let validacion = req.body.validacion;
  mc.query('UPDATE datos SET Reportado = 1, Correcto = ? WHERE datos.IdDatos = ?', [validacion, IdDatos], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Se valido la alera de desuso de aula correctamente'
    });
  });
});

//ID = 33 - GET = listado de todos los reportes segun la sede 
app.get('/reporte/listado/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT rep.IdReporte, carrera.NomCarrera, curso.NomCurso, curso.NomProfesor, rep.FechaReporte, aula.NomAula, usuario.NomUsuario, usuario.ApeUsuario, datos.CapturaFotografica, rep.IdDatos FROM reporte AS rep INNER JOIN aula ON aula.IdAula = rep.IdAula  INNER JOIN areatrabajo ON areatrabajo.IdArea = aula.IdArea AND areatrabajo.IdSede = ? INNER JOIN carrera ON carrera.IdCarrera = rep.IdCarrera  INNER JOIN usuario ON usuario.IdUsuario = rep.IdUsuario  INNER JOIN datos ON datos.IdDatos = rep.IdDatos INNER JOIN curso ON curso.IdCurso = rep.IdCurso ORDER BY rep.FechaReporte DESC', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Listado de todos los reportes segun la sede'
    });
  });
});

//ID = 34 - GET = listado de todos las carreras segun la sede 
app.get('/carreras/listado/', function (req, res) {
  let IdSede = req.query.IdSede;
  mc.query('SELECT carrera.IdCarrera, carrera.NomCarrera FROM carrera INNER JOIN posee ON carrera.IdCarrera = posee.IdCarrera AND posee.IdSede = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todos las carreras segun la sede'
    });
  });
});

//ID = 35 - DELETE = eliminar reporte
app.delete('/reporte/eliminar/', function (req, res) {
  let Idreporte = req.query.Idreporte;
  mc.query('DELETE FROM reporte WHERE Idreporte = ?', Idreporte, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Reporte eliminado correctamente'
    });
  });
});

//ID = 36 - PUT = Se ha activado el campus
app.put('/campus/activar/', function (req, res) {
  let id = req.body.id;
  let fecha = null;
  mc.query('UPDATE sede SET Activa = 1, FechaActivacion = ? WHERE IdSede = ?', [fecha, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Se ha activado el campus con id ' + id
    });
  });
});

//ID = 37 - PUT = Se ha desactivado el campus
app.put('/campus/desactivar/', function (req, res) {
  let id = req.body.id;
  let fecha = new Date();
  fecha.setHours(fecha.getHours() - 3)

  mc.query('UPDATE sede SET Activa = 0, FechaActivacion = ? WHERE IdSede = ?', [fecha, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Se ha desactivado el campus con id ' + id
    });
  });
});

//ID = 38 - GET = obtener el estado de uso del aula
app.get('/campus/estado/', function (req, res) {
  let IdCampus = req.query.IdCampus;
  mc.query('SELECT Activa FROM sede WHERE IdSede = ?', IdCampus, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Estado del campus'
    });
  });
});

////////////////////////////
//Sin Usar
////////////////////////////

//ID = random - GET = listado de todos los encargados
app.get('/encargado/listado', function (req, res) {
  mc.query('SELECT IdUsuario,NomUsuario,ApeUsuario,Mail FROM usuario WHERE IdRol = 2', function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todos los encargados de aulas de la sede'
    });
  });
});

//ID = 28 - POST = Registar un nuevo sensor 
app.post('/sensor/crear', function (req, res) {
  let datosSensor = {
    FechaInstalacion: req.body.FechaInstalacion,
    FechaMantenimiento: req.body.FechaInstalacion,
    IdAula: req.body.IdAula,
  };
  if (mc) {
    mc.query("INSERT INTO sensor SET ?", datosSensor, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 18 - PUT = editar sensor   *nada
app.put('/sensor/editar/:IdSensor', function (req, res) {
  let IdSede = req.params.IdSede;
  let datosSensor = {
    FechaMantenimiento: req.body.FechaMantenimiento,
    IdAula: req.body.IdAula,
  };
  mc.query('UPDATE sensor SET ? WHERE IdSensor = ?', [datosSensor, IdSede], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'sensor editado correctamente'
    });
  });
});

//ID = 19 - DELETE = eliminar sensor                        *nada
app.delete('/sensor/eliminar/:IdSensor', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('DELETE FROM sensor WHERE IdSensor = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'sensor eliminado correctamente'
    });
  });
});

//ID = 20 - GET = obtener datos ambientales de una determinada aula  *nada
app.get('/aulas/detalle/:IdAula', function (req, res) {
  let IdAula = req.params.IdAula;
  mc.query('SELECT datos.IntensidadLuminica, datos.NivelesDeCO2, datos.Temperatura, datos.Humedad FROM datos INNER JOIN sensor ON datos.IdSensor = sensor.IdSensor AND sensor.IdAula = ? LIMIT 10', IdAula, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'obtener datos ambientales del aula con id ' + IdAula
    });
  });
});

//ID = random - GET = obtener todas los cursos de una carrera                         
app.get('/cursos/obtener/:Idcarrea', function (req, res) {
  let Idcarrea = req.params.Idcarrea;
  mc.query('SELECT curso.IdCurso, curso.NomCurso FROM curso WHERE curso.IdCarrera = ?', Idcarrea, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'todas los cursos de la carrera con id ' + Idcarrea
    });
  });
});

//ID = random - GET = Obtener datos de la coordinadora de aula segun la sede
app.get('/obtener/datos/coordinadora/:IdSede', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('SELECT usuario.NomUsuario, usuario.ApeUsuario,usuario.Mail FROM sede  INNER JOIN usuario ON sede.IdCiudad = usuario.IdCiudad AND sede.IdSede = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Datos de la coordinadora de aula segun la sede'
    });
  });
});

//ID = random - POST = crear una reseva                                                *nada
app.post('/reserva/crear', function (req, res) {
  let datosreserva = {
    DiaClases: req.body.DiaClases,
    EnUso: 1,
    FechaLimite: req.body.FechaLimite,
    IdCurso: req.body.IdCurso,
    IdAula: req.body.IdAula,
    IdSede: req.body.IdSede,
  };
  if (mc) {
    mc.query("INSERT INTO reserva SET ?", datosreserva, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = random - POST = crear una reseva con bloque                                      *nada
app.post('/reserva/crear/bloque', function (req, res) {
  let datosreserva = {
    IdReserva: req.body.IdReserva,
    IdBloque: req.body.IdBloque,
  };
  if (mc) {
    mc.query("INSERT INTO contiene SET ?", datosreserva, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 25 - GET = listado de todos los reportes segun la sede y la carrera        *nada
app.get('/reporte/listado/carrera', function (req, res) {
  let IdSede = req.body.IdSede;
  let IdCarrera = req.body.IdCarrera;

  mc.query('SELECT rep.IdReporte, carrera.NomCarrera, curso.NomCurso, curso.NomProfesor, rep.FechaReporte, aula.NomAula, usuario.IdUsuario, usuario.NomUsuario, usuario.ApeUsuario, rep.IdDatos FROM reporte AS rep INNER JOIN aula ON aula.IdAula = rep.IdAula INNER JOIN areatrabajo ON areatrabajo.IdArea = aula.IdArea AND areatrabajo.IdSede = ? INNER JOIN carrera ON carrera.IdCarrera = rep.IdCarrera AND carrera.IdCarrera = ? INNER JOIN curso ON carrera.IdCarrera = curso.IdCarrera INNER JOIN usuario ON usuario.IdUsuario = rep.IdUsuario ORDER BY rep.FechaReporte DESC', [IdSede, IdCarrera], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de reportes de una sede segun la carrera universitaria'
    });
  });
});

//ID = random - POST = verifica si el aula esta reservada   *nada
app.get('/aula/validacion/reserva', function (req, res) {
  let IdSensor = req.body.IdSensor;
  let IdBlocke = req.body.IdBlocke;
  let fecha = req.body.fecha;
  mc.query('SELECT reserva.IdReserva FROM sensor INNER JOIN reserva ON sensor.IdAula = reserva.IdAula AND reserva.Fecha = ? INNER JOIN contiene ON reserva.IdReserva = contiene.IdReserva AND contiene.IdBloque = ? WHERE sensor.IdSensor = ?', [fecha, IdBlocke, IdSensor], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todos las carreras segun la sede'
    });
  });
});

//ID = random - GET = obtener el estado de uso del aula  *nada
app.get('/reserva/Obtener/:IdReserva', function (req, res) {
  let IdReserva = req.params.IdReserva;
  mc.query('SELECT reserva.EnUso FROM reserva WHERE reserva.IdReserva = ?', IdReserva, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Estado de uso del aula'
    });
  });
});

//ID = random - PUT = editar estado de uso del aula         *nada
app.put('/reserva/editar/:IdReserva', function (req, res) {
  let IdReserva = req.params.IdReserva;
  mc.query('UPDATE reserva SET reserva.EnUso = 0 WHERE reserva.IdReserva = ?', IdReserva, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Se aeditado el estado de la reserva'
    });
  });
});

//ID = random - GET = obtener el estado de uso del aula
app.get('/reserva/Obtener/:IdReserva', function (req, res) {
  let IdReserva = req.params.IdReserva;
  mc.query('SELECT reserva.EnUso FROM reserva WHERE reserva.IdReserva = ?', IdReserva, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Estado de uso del aula'
    });
  });
});

app.post('/enviarcorreo', function (req, res) {
  if (mc) {
    //EL SMTPTRANSPORT ES EL QUE ENVIA EL CORREO, ESTA AQUI PA QUE NO SE ENVIE UN CORREO CADA VEZ QUE HACES UN CAMBIO EN EL BACK
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  }
});

//Rutass
app.get("/", (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: "Peticion realizada correctamente",
  });
});

app.listen(3000, () => {
  console.log("Express Server - puerto 3000 online");
});