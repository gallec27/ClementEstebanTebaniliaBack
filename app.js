const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = 3000;

const sequelize = require('./config/sequelize-config');

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada y modelos sincronizados.');
});

//middlewares
app.set("view engine", "ejs");
//app.use('/public', express.static('public')); //carpeta publica para archivos estaticos (css, js, img, etc)
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

/* // Configurar cookie-parser
app.use(cookieParser()); */

/* // Configurar express-session
app.use(
  session({
    secret: "tebanilia_sabores", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Configura a true si estás utilizando HTTPS
      httpOnly: true,
      maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (aquí se establece a 1 hora)
    },
  })
); */

app.use("/products", require("./routes/productRoutes"));

app.use("/user", require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});