const mongoose = require('mongoose')
const bcryptjs= require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        nombreU:{
            type:String
        },
        emailU:{
            type:String
        },
        contraseña:{
            type:String
        }
    }
)
//crear la accion pre
userSchema.pre('save', async function(next){
    //crear la sal
    const sal = await bcryptjs.genSalt(10)
    //encriptar la contraseña
    this.contraseña= await bcryptjs.
                   hash(this.contraseña, sal)
})

//metodo construye el json web token


userSchema.methods.ObtenerTokenJWT= function(){
    const JWT_SECRET_KEY = "mascotasOnline"
    return jwt.sign({
        id: this._id,
        nombreU: this.nombreU,
        contraseña: this.contraseña,
        email: this.email,
    }, 
        JWT_SECRET_KEY, 
        { 
            expiresIn: Date.now() + 10000
        }
    )
}

//comparar password del body
userSchema.methods.comparePassword = async function(contraseña){
    return await bcryptjs.compare(contraseña, this.contraseña)
}



const User =
module.exports = mongoose.model('User',userSchema)