const express = require("express")
const productModel = require('../models/productModel')
const moongose = require('mongoose')
const router = express.Router()

//URI of products

//trae todos los productos
router.get('/',
    async(request, response)=>{

        try {
            const Productos = await productModel.find()

            if (Productos.length === 0) {
                return response.
                status(404).
                json({
                    success: false,
                    msg:"No hay citas disponibles"
                })
            }

            response
                .status(200)
                .json({
                    "success": true, 
                    "results":Productos
                })

        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
        }
})
//registrar producto
router.post('/',
     async(request, response)=>{
        try {
            const producto = await productModel.create({
              nombre: request.body.nombre,
              marca: request.body.marca,
              descripcion: request.body.marca
            });
        
            response.status(201).json({
              success: true,
              msg: 'Producto creado con éxito!',
            });
          } catch (error) {
            response.status(500).json({
              success: false,
              msg: error.message,
            });
          }
})

module.exports = router 