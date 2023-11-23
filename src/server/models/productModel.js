const mongoose = require('mongoose')

const citaSchema = new mongoose.Schema(
    {
       nombre:{
            type:String
       },
       marca:{
            type:String
       },
       descripcion:{
            type:String
       },
       fechaCreacion:{
        type: Date,
        default: Date.now
    }

    }
)

const Cita =
module.exports = mongoose.model('Producto',citaSchema)