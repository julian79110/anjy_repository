const express = require('express')
const router = express.Router()
const userModel = require ('../models/usuarioModel')

router.post('/register', 
            async(req, res)=>{
                const {nombreU, emailU, contraseña} = req.body;
                try {
                    const user = 
                    await userModel.create({
                        nombreU,
                        emailU,
                        contraseña
                    })
            res
                .status(201)
                .json({
                    sucess: true,
                    msg: "usuario creado exitosamente",
                    token:user.ObtenerTokenJWT()
                })
                } catch (error) {
                    res
                        .status(400)
                        .json({
                            sucess: false,
                            message: error.message
                        })
                    
                }

            })
           
//login 
router.post('/login', async (req, res) => {
    
    const {emailU,contraseña}=req.body;

    //si no llega email o password
    if(!emailU || !contraseña){
        res.status(400).json({
            success:false,
            message: "Debe ingresar el email o password"
        })
    }else{
        try {
            //encontrar usuario con el password
            const user = await userModel.findOne({ emailU }).select("+contraseña")
            
            //console.log(user)
            if (!user) {
                res.status(400).json({
                    success:false,
                    msg:"no se encontro el usuario"
                })
            }
            else{
                //comparar
                const isMatch = await user.comparePassword(contraseña)
                if(!isMatch){
                    res.status(400).json({
                        success: false,
                        msg:"contraseña incorrecta"
                        
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        msg:"la contraseña es correcta",
                        token: user.ObtenerTokenJWT()
                    })
                }
            }
        } catch (error) {
            
        }
    }
})

module.exports = router