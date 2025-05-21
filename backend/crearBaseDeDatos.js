const mongoose = require('mongoose');
const faker = require('faker');
const Cliente = require('./models/Cliente');
const Cuenta = require('./models/Cuenta');
const Transaccion = require('./models/Transaccion');

const MONGO_URI = 'mongodb://127.0.0.1:27017/banco-nexus';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    return resetAndSeedDatabase();
  })
  .catch(err => console.error('❌ Error de conexión:', err));

async function resetAndSeedDatabase() {
  try {
    console.log('🧹 Limpiando base de datos...');
    await Cliente.deleteMany();
    await Cuenta.deleteMany();
    await Transaccion.deleteMany();
    console.log('✅ Base limpia');

    const clientes = [];
    console.log('👤 Creando clientes...');
    for (let i = 0; i < 5; i++) {
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
    for (let cliente of clientes) {
      const numeroCuenta = faker.finance.account(8);
      const saldoInicial = faker.datatype.number({ min: 1000, max: 10000 });

      const cuenta = new Cuenta({
        numeroCuenta,
        cliente: cliente._id,
        saldo: saldoInicial
      });
      await cuenta.save();

      for (let i = 0; i < 5; i++) {
        const tipo = faker.helpers.randomize(['deposito', 'retiro']);
        const cantidad = faker.datatype.number({ min: 100, max: 1000 });

        const transaccion = new Transaccion({
          cuenta: cuenta._id,
          tipo,
          cantidad,
          fecha: faker.date.past()
        });

        await transaccion.save();
      }

      console.log(`✅ Cuenta ${numeroCuenta} creada para ${cliente.nombre}`);
    }

    console.log('🎉 Base de datos inicializada con éxito!');
    process.exit();
  } catch (error) {
    console.error('❌ Error inicializando:', error);
    process.exit(1);
  }
}
