const mongoose = require('mongoose')

const compraSchema = new mongoose.Schema(
    {
       nombreProducto:{
            type:String
       },
       precioProducto:{
            type:String
       },
       correousuario:{
            type:String
       },
       numeroUsuario:{
            type:String
       },
       fechaCompra:{
            type: Date,
            default: Date.now
        }

    }
)

const Compra =
module.exports = mongoose.model('Compras',compraSchema)