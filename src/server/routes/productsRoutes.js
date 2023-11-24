const express = require("express")
const productModel = require('../models/productModel')
const userModel = require('../models/usuarioModel');
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
              descripcion: request.body.descripcion,
              precio: request.body.precio,
              emailU: request.body.emailU
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
// Traer productos del publicador
router.get('/user/:email', async (req, res) => {
  const userEmail = req.params.email;

  try {
      // Buscar el usuario por su correo electrónico
      const user = await userModel.findOne({ emailU: userEmail });

      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'Usuario no encontrado',
          });
      }

      // Filtrar los productos asociados al usuario
      const products = await productModel.find({ emailU: user.emailU });

      res.status(200).json({
          success: true,
          products,
      });
  } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
      });
  }
});

// Ruta para eliminar un producto por su ID
router.delete("/:id", async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Verificar si el producto existe
      const product = await productModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
      }
  
      // Eliminar el producto
      await productModel.deleteOne({ _id: productId });
  
      res.status(200).json({
        success: true,
        message: "Producto eliminado con éxito",
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  // Ruta para actualizar un producto por su ID
router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
  
    try {
      // Verificar si el producto existe
      const existingProduct = await productModel.findById(productId);
  
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
      }
  
      // Actualizar el producto
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true } // Devuelve el producto actualizado
      );
  
      res.status(200).json({
        success: true,
        message: "Producto actualizado con éxito",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
  

module.exports = router 