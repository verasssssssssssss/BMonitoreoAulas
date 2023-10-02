const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cors = require("cors");

const mysql = require("mysql");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const OAuth2 = google.auth.OAuth2;
const CLIENT_ID = "501116274914-hm1ghv43pdfcb7jhnh9uhonils0lvib8.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04sQc0x2YT7qrCgYIARAAGAQSNwF-L9IrH2eVJR9E8SEJ7jEBWxvfakuYJQzKLdmbFSxkuLpDfYv5_srxpnVm5FxX0G7xOj_6Yi8";

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "monitoreoaulas@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
  }
});


//ID = ? - POST = enviar correo de desuso de aula
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/EnviarCorreo", (req, res) => {
  let datoscorreo = {
    to: req.body.to,
    NomDirector: req.body.NomDirector,
    ApeDirector: req.body.ApeDirector,
    NomSede: req.body.NomSede,
    NomCurso:req.body.NomCurso, 
    NomProfesor:req.body.NomProfesor, 
    FechaReporte:req.body.FechaReporte, 
    NomCarrera:req.body.NomCarrera, 
    NomEncargado:req.body.NomEncargado,
    NomAula:req.body.NomAula, 
    CapturaFotografica:req.body.CapturaFotografica,  
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
      <p>Me dirijo a usted en mi capacidad de encargado de aula de la sede ${datoscorreo.NomSede}, con el propósito de informarle sobre una situación relacionada con el uso de las instalaciones.</p>
      <p>El motivo de mi comunicación es notificarle que el aula de clases designada con el nombre ${datoscorreo.NomAula} ha permanecido desocupada el día de la fecha, ${datoscorreo.FechaReporte},
       a pesar de que había sido previamente reservada para el curso ${datoscorreo.NomCurso} impartido por el profesor ${datoscorreo.NomProfesor} de la carrera ${datoscorreo.NomCarrera}.</p>
      <p>Adjunto a este correo, encontrará una captura fotográfica que muestra el estado actual del aula en cuestión como evidencia del desuso.</p>
      <img class="imagen-centrada" src=${datoscorreo.CapturaFotografica}>
      <p>Agradezco su atención a esta situación y quedo a la espera de sus indicaciones al respecto.</p>
      <p class="firma">Atentamente,</p>
      <p class="firma">${datoscorreo.NomEncargado}</p>
      <p class="pie-pagina">Sistema de monitoreo de aulas universidad del BIO-BIO.</p>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: "Sistema de monitoreo de aulas UBB <monitoreoaulas@gmail.com>",
    to: datoscorreo.to,
    subject: "Notificacion de desuso de aula "+datoscorreo.NomAula,
    generateTextFromHTML: true,
    html: msg
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo.");
    } else {
      console.log(response);
      res.send("Correo enviado correctamente.");
    }
    smtpTransport.close();
  });
});















































//CORS middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psensores",
});
mc.connect();

/* app.use('/', (req, res, next) => {
  let token = req.query.token;
  let SEED = "esta-es-una-semilla";
  console.log(token);
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
}); */


/////////////////////////////////////////////////////////////
// sensores
/////////////////////////////////////////////////////////////

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
    let Usuario = {
      IdUsuario: results[0].IdUsuario,
      NomUsuario: results[0].NomUsuario,
      ApeUsuario: results[0].ApeUsuario,
      Mail: results[0].Mail,
      IdRol: results[0].IdRol,
      IdSede: results[0].IdSede,
      IdCarrera: results[0].IdCarrera,
      IdCiudad: results[0].IdCiudad
    };
    if (!results.length) {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales incorrectas",
        errors: err,
      });
    }
    if (bcrypt.compareSync(Contrasenia, results[0].Contrasenia)) {
      return res.status(200).json({
        ok: true,
        mensaje: "usuario logueado correctamente",
        data: Usuario,
        errors: err
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

//ID = random - GET = Nombre de la Ciudad segun id *
app.get('/sede/obtener/:IdCiudad', function (req, res) {
  let IdCiudad = req.params.IdCiudad;
  mc.query('SELECT ciudad.NomCiudad FROM ciudad WHERE ciudad.IdCiudad = ?', IdCiudad, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Nombre de la ciudad segun id'
    });
  });
});

//ID = random - GET = listado de sedes segun la ciudad *
app.get('/sede/listado/:IdCiudad', function (req, res) {
  let IdCiudad = req.params.IdCiudad;
  mc.query('SELECT sede.IdSede,sede.NomSede FROM sede INNER JOIN ciudad ON ciudad.IdCiudad = sede.IdCiudad AND ciudad.IdCiudad = ?', IdCiudad, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Listado de sedes segun la ciudad'
    });
  });
});

//ID = random - GET = Datos de encargado de aula segun id *
app.get('/encargado/obtener/:IdUsuario', function (req, res) {
  let IdUsuario = req.params.IdUsuario;
  mc.query('SELECT IdUsuario,NomUsuario, ApeUsuario, Mail, Contrasenia FROM usuario WHERE IdUsuario = ?', IdUsuario, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Datos de encargado de aula segun id ' + IdUsuario
    });
  });
});

//ID = random - PUT = eliminar encargado de una area segun id encargado *
app.put('/area/quitar/:IdUsuario', (req, res) => {
  let IdUsuario = req.params.IdUsuario;
  mc.query("UPDATE areatrabajo SET IdUsuario=NULL WHERE IdUsuario  = ?", IdUsuario, function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "Todas las área que tenian al encargado con id = " + IdUsuario + " ha quedado sin encargado" });
  });
});


//ID = 2 y 4 - GET = listado de areas de trabajo segunn la sede *
app.get('/area/listado/:IdSede', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('SELECT 	ar.IdArea,ar.NomArea,ar.IdUsuario,us.NomUsuario,us.ApeUsuario FROM areatrabajo AS ar LEFT JOIN usuario AS us ON ar.IdUsuario = us.IdUsuario AND us.IdRol = 2  WHERE ar.IdSede = ? AND ar.Visible = 1', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Áreas de trabajo registradas en la sede'
    });
  });
});

//ID = random - GET = Obtner datos para correo
app.get('/correo/Obtener/:IdSede', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('SELECT sede.NomSede, usuario.NomUsuario, usuario.ApeUsuario, usuario.Mail FROM ciudad INNER JOIN sede ON ciudad.IdCiudad = sede.IdCiudad INNER JOIN usuario ON usuario.IdCiudad = ciudad.IdCiudad WHERE sede.IdSede = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Listado de sedes segun la ciudad'
    });
  });
});

//ID = 3 - GET = listado de todos los encargados de aulas segun la sede *
app.get('/encargado/listado/:IdSede', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('SELECT IdUsuario,NomUsuario,ApeUsuario,Mail FROM usuario WHERE IdRol = 2 AND IdSede = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todos los encargados de aulas de la sede'
    });
  });
});

//ID = 5 - GET = listado de todas las aulas de un área *
app.get('/aula/listado/:IdArea', function (req, res) {
  let IdArea = req.params.IdArea;
  mc.query('SELECT * FROM aula WHERE IdArea = ? AND aula.Visible = 1', IdArea, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todas las aulas de un área'
    });
  });
});

//ID = 6 - POST = crear encargado de aula 
app.post('/encargado/crear', function (req, res) {
  let datosEncargado = {
    NomUsuario: req.body.NomUsuario,
    ApeUsuario: req.body.ApeUsuario,
    Mail: req.body.Mail,
    Contrasenia: bcrypt.hashSync(req.body.Contrasenia, 10),
    IdRol: 2,
    IdSede: req.body.IdSede,
  };
  console.log(datosEncargado);
  if (mc) {
    mc.query("INSERT INTO usuario SET ?", datosEncargado, function (error, results) {
      if (error) {
        console.log(nofincona);
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 7 - PUT = editar datos de encargado de aula 
app.put('/encargado/editar/:IdUsuario', (req, res) => {
  let IdUsuario = req.params.IdUsuario;
  let datosEncargado = {
    NomUsuario: req.body.NomUsuario,
    ApeUsuario: req.body.ApeUsuario,
    Mail: req.body.Mail,
    Contrasenia: req.body.Contrasenia,
    IdSede: req.body.IdSede,
  };
  if (!IdUsuario) {
    return res.status(400).send({ message: 'Debe proveer el id de una usuario existente' });
  }
  mc.query("UPDATE usuario SET ? WHERE IdUsuario = ?", [datosEncargado, IdUsuario], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El encargado de aula con id = " + IdUsuario + " ha sido actualizado" });
  });
});

//ID = 8 - PUT = eliminar encargado de aula *
app.put('/encargado/eliminar/:IdUsuario', (req, res) => {
  let IdUsuario = req.params.IdUsuario;

  mc.query("UPDATE usuario SET IdRol=4 WHERE IdUsuario = ?", IdUsuario, function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El encargado de aula con id = " + IdUsuario + " ha sido eliminado" });
  });
});

//ID = 9 - POST = crear area de trabajo *
app.post('/area/crear', function (req, res) {
  let datosAreaDeTrabajo = {
    NomArea: req.body.NomArea,
    IdSede: req.body.IdSede,
    Visible: 1,
  };
  console.log(datosAreaDeTrabajo);
  if (mc) {
    mc.query("INSERT INTO areatrabajo SET ?", datosAreaDeTrabajo, function (error, results) {
      if (error) {
        console.log(nofincona);
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 10 - PUT = editar area de trabajo *
app.put('/area/editar/:IdArea', (req, res) => {
  let IdArea = req.params.IdArea;
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

//ID = 11 - PUT = "Elminar" área de trabajo *
app.put('/area/eliminar/:IdArea', (req, res) => {
  let IdArea = req.params.IdArea;
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

//ID = 12 - PUT = asignar área de trabajo *
app.put('/area/asignar/:IdArea', (req, res) => {
  let IdArea = req.params.IdArea;
  let DatosArea = {
    IdUsuario: req.body.IdUsuario,
  };
  if (!IdArea) {
    return res.status(400).send({ message: 'Debe proveer el id de una usuario existente' });
  }
  mc.query("UPDATE areatrabajo SET ? WHERE IdArea = ?", [DatosArea, IdArea], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El area de trabajo con id = " + IdArea + " ha sido actualizado" });
  });
});

//ID = 13 - PUT = delegar área de trabajo *
app.put('/area/delegar/:IdArea', (req, res) => {
  let IdArea = req.params.IdArea;
  let DatosArea = {
    IdUsuario: null,
  };
  if (!IdArea) {
    return res.status(400).send({ message: 'Debe proveer el id de una usuario existente' });
  }
  mc.query("UPDATE areatrabajo SET ? WHERE IdArea = ?", [DatosArea, IdArea], function (error, results, fields) {
    if (error) throw error;
    return res.status(200).json({ "Mensaje": "El area de trabajo con id = " + IdArea + " ha sido actualizado" });
  });
});

//ID = 14 - POST = Registar una nueva aula  *
app.post('/aula/crear', function (req, res) {
  let datosAula = {
    NomAula: req.body.NomAula,
    IdArea: req.body.IdArea,
    CantidadAlumnos: req.body.CantidadAlumnos,
    Visible: 1,
  };
  console.log(datosAula);
  if (mc) {
    mc.query("INSERT INTO aula SET ?", datosAula, function (error, results) {
      if (error) {
        console.log(nofincona);
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 15 - PUT = editar aula *
app.put('/aula/editar/:IdAula', (req, res) => {
  let IdAula = req.params.IdAula;
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

//ID = 16 - PUT = eliminar aula *
app.put('/aula/eliminar/:IdAula', (req, res) => {
  let IdAula = req.params.IdAula;
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

//ID = 17 - POST = Registar un nuevo sensor 
app.post('/sensor/crear', function (req, res) {
  let datosSensor = {
    FechaInstalacion: req.body.FechaInstalacion,
    FechaMantenimiento: req.body.FechaInstalacion,
    IdAula: req.body.IdAula,
  };
  console.log(datosSensor);
  if (mc) {
    mc.query("INSERT INTO sensor SET ?", datosSensor, function (error, results) {
      if (error) {
        console.log(nofincona);
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 18 - PUT = editar sensor 
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

//ID = 19 - DELETE = eliminar sensor 
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

//ID = 20 - GET = obtener datos ambientales de una determinada aula 
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

//ID = 21 - GET = obtener alerta de desuso de aula 
app.get('/reporte/obtener/:IdUsuario', function (req, res) {
  let IdUsuario = req.params.IdUsuario;
  mc.query('SELECT areatrabajo.IdArea ,aula.IdAula,areatrabajo.NomArea,aula.NomAula,datos.CapturaFotografica,datos.IdDatos FROM areatrabajo INNER JOIN aula ON areatrabajo.IdArea  = aula.IdArea INNER JOIN sensor ON aula.IdAula = sensor.IdAula INNER JOIN datos ON sensor.IdSensor = datos.IdSensor AND datos.Reportado = 0 AND datos.Correcto = 1 WHERE areatrabajo.IdUsuario = ?', IdUsuario, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      dataLenghy: results.length,
      data: results,
      message: 'Obtener alerta de desuso de aula'
    });
  });
});

//ID = random - PUT = Afirmar o negar alerta de desuso de aula 
app.put('/reporte/validar', function (req, res) {
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

//ID = 22 - POST = crear un reprote de desuso de aula 
app.post('/reporte/crear', function (req, res) {
  let datosReporte = {
    NomCurso: req.body.NomCurso,
    NomProfesor: req.body.NomProfesor,
    FechaReporte: req.body.FechaReporte,
    IdCarrera: req.body.IdCarrera,
    IdUsuario: req.body.IdUsuario,
    IdAula: req.body.IdAula,
    IdDatos: req.body.IdDatos,
  };
  console.log(datosReporte);
  if (mc) {
    mc.query("INSERT INTO reporte SET ?", datosReporte, function (error, results) {
      if (error) {
        console.log(nofincona);
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = 25 - GET = listado de todos los reportes segun la sede y la carrera 
app.get('/reporte/listado/carrera', function (req, res) {
  let IdSede = req.body.IdSede;
  let IdCarrera = req.body.IdCarrera;

  mc.query('SELECT rep.IdReporte, carrera.NomCarrera, rep.NomCurso, rep.NomProfesor, rep.FechaReporte, aula.NomAula, usuario.NomUsuario, usuario.ApeUsuario, rep.IdDatos FROM reporte AS rep INNER JOIN aula ON aula.IdAula = rep.IdAula INNER JOIN areatrabajo ON areatrabajo.IdArea = aula.IdArea AND areatrabajo.IdSede = ? INNER JOIN carrera ON carrera.IdCarrera = rep.IdCarrera AND carrera.IdCarrera = ? INNER JOIN usuario ON usuario.IdUsuario = rep.IdUsuario', [IdSede, IdCarrera], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de reportes de una sede segun la carrera universitaria'
    });
  });
});

//ID = 23 - GET = listado de todos los reportes segun la sede 
app.get('/reporte/listado/:IdSede', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('SELECT rep.IdReporte, carrera.NomCarrera, rep.NomCurso, rep.NomProfesor, rep.FechaReporte, aula.NomAula, usuario.NomUsuario, usuario.ApeUsuario, datos.CapturaFotografica, rep.IdDatos FROM reporte AS rep INNER JOIN aula ON aula.IdAula = rep.IdAula INNER JOIN areatrabajo ON areatrabajo.IdArea = aula.IdArea AND areatrabajo.IdSede = ? INNER JOIN carrera ON carrera.IdCarrera = rep.IdCarrera INNER JOIN usuario ON usuario.IdUsuario = rep.IdUsuario INNER JOIN datos ON datos.IdDatos = rep.IdDatos', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Listado de todos los reportes segun la sede'
    });
  });
});

//ID = 24 - GET = listado de todos las carreras segun la sede *
app.get('/carreras/listado/:IdSede', function (req, res) {
  let IdSede = req.params.IdSede;
  mc.query('SELECT carrera.IdCarrera, carrera.NomCarrera FROM carrera INNER JOIN posee ON carrera.IdCarrera = posee.IdCarrera AND posee.IdSede = ?', IdSede, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'listado de todos las carreras segun la sede'
    });
  });
});

//ID = random - DELETE = eliminar reporte
app.delete('/reporte/eliminar/:Idreporte', function (req, res) {
  let Idreporte = req.params.Idreporte;
  mc.query('DELETE FROM reporte WHERE Idreporte = ?', Idreporte, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Reporte eliminado correctamente'
    });
  });
});

//ID = 26 - POST = insertar datos 
app.post('/datos/registrar', function (req, res) {
  let datosDatos = {
    Fecha: req.body.Fecha,
    Reportado: req.body.Reportado,
    Correcto: req.body.Correcto,
    IntensidadLuminica: req.body.IntensidadLuminica,
    NivelesDeCO2: req.body.NivelesDeCO2,
    Temperatura: req.body.Temperatura,
    Humedad: req.body.Humedad,
    IdSensor: req.body.IdSensor,
  };

  if (mc) {
    mc.query("INSERT INTO datos SET ?", datosDatos, function (error, results) {
      if (error) {
        res.status(500).json({ "Mensaje": "Error" });
      }
      else {
        res.status(201).json({ "Mensaje": "Insertado" });
      }
    });
  }
});

//ID = random - POST = verifica si el aula esta reservada ¿?
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

//ID = random - PUT = editar estado de uso del aula
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