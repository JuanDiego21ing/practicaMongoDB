const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const connectDB = require("./config/db");
const mongoose = require('mongoose');



const cuentaRouter = require("./routes/cuenta");
const transaccionesRoutes = require('./routes/transacciones');


const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas personalizadas
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/cuenta", cuentaRouter);
app.use("/api", transaccionesRoutes);
app.use('/api/transacciones', require('./routes/transacciones'));

// app.use('/api/cuentas', require('./routes/cuentas'));
 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error:", err));

module.exports = app;
