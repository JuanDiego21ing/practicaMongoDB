const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Obtener todos los clientes
router.get('/', clienteController.obtenerClientes);

// Crear un nuevo cliente
router.post('/', clienteController.crearCliente);

// Obtener un cliente por ID
router.get('/:id', clienteController.obtenerClientePorId);

// Actualizar un cliente
router.put('/:id', clienteController.actualizarCliente);

// Eliminar un cliente
router.delete('/:id', clienteController.eliminarCliente);

router.get('/', async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    console.log('Clientes encontrados:', clientes.length);
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});


module.exports = router;
