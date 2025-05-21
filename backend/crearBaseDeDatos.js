// crearBaseDeDatos.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Cliente = require('./models/Cliente');
const Cuenta = require('./models/Cuenta');
const Transaccion = require('./models/Transaccion');

const faker = require('faker'); // Asegúrate de instalar: npm install faker@5.5.3

const crearDatos = async () => {
  await connectDB();

  console.log('🧹 Limpiando base de datos...');
  await Cliente.deleteMany();
  await Cuenta.deleteMany();
  await Transaccion.deleteMany();

  console.log('✅ Base limpia');

  const clientes = [];

  console.log('👤 Creando clientes...');

  for (let i = 0; i < 10; i++) {
    const cliente = new Cliente({
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      correo: faker.internet.email(),
      telefono: faker.phone.phoneNumber(),
      direccion: faker.address.streetAddress(),
      curp: faker.random.alphaNumeric(18).toUpperCase()
    });

    await cliente.save();
    clientes.push(cliente);
  }

  console.log('🏦 Creando cuentas y transacciones...');

  for (const cliente of clientes) {
    const cuentas = [];

    const cantidadCuentas = Math.floor(Math.random() * 2) + 1; // 1 o 2 cuentas
    for (let i = 0; i < cantidadCuentas; i++) {
      const cuenta = new Cuenta({
        cliente: cliente._id,
        numeroCuenta: faker.finance.account(10),
        tipo: faker.random.arrayElement(['ahorro', 'nomina', 'inversion']),
        saldo: faker.finance.amount(1000, 10000, 2)
      });

      await cuenta.save();
      cuentas.push(cuenta);

      // Crear transacciones
      const cantidadTransacciones = Math.floor(Math.random() * 4) + 2; // 2 a 5 transacciones
      for (let j = 0; j < cantidadTransacciones; j++) {
        const transaccion = new Transaccion({
          cuenta: cuenta._id,
          tipo: faker.random.arrayElement(['ingreso', 'retiro', 'transferencia']),
          monto: faker.finance.amount(50, 1000, 2),
          descripcion: faker.lorem.sentence()
        });

        await transaccion.save();
      }
    }
  }

  console.log('🎉 Base de datos inicializada con éxito!');
  process.exit();
};

crearDatos().catch((err) => {
  console.error('❌ Error al crear datos:', err);
  process.exit(1);
});
