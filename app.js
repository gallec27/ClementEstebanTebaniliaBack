const express = require("express");
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
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use("/products", require("./routes/productRoutes"));

app.use("/user", require("./routes/userRoutes"));

app.use("/cart", require("./routes/orderRoutes"));

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});