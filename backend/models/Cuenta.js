const mongoose = require("mongoose");

const cuentaSchema = new mongoose.Schema(
  {
    numeroCuenta: {
      type: String,
      required: true,
      unique: true,
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    saldo: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cuenta", cuentaSchema);
