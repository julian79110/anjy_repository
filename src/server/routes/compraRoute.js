const express = require("express")
const compraModel = require('../models/compraModel.js')
const userModel = require('../models/usuarioModel');
const moongose = require('mongoose')
const router = express.Router()


//registrar producto
router.post('/',
     async(request, response)=>{
        try {
            const compra = await compraModel.create({
              nombreProducto: request.body.nombreProducto,
              precioProducto: request.body.precioProducto,
              correousuario: request.body.correousuario,
              numeroUsuario: request.body.numeroUsuario
            });
        
            response.status(201).json({
              success: true,
              msg: 'La Compra ha salido con éxito!',
            });
          } catch (error) {
            response.status(500).json({
              success: false,
              msg: error.message,
            });
          }
})

router.get('/compra/:correoUsuario', async (req, res) => {
  const userEmail = req.params.correoUsuario.trim();

  try {
    // Filtrar las compras asociadas al usuario por su correo electrónico
    const compras = await compraModel.find({ correousuario: userEmail });

    res.status(200).json({
      success: true,
      compras,
    });
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
});

module.exports = router 