const express = require('express')
const router = express.Router()
const userModel = require ('../models/usuarioModel')

router.post('/register', 
            async(req, res)=>{
                const {nombreU, emailU, contraseña,rol} = req.body;
                try {
                    const user = 
                    await userModel.create({
                        nombreU,
                        emailU,
                        contraseña,
                        rol
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
    const { emailU, contraseña } = req.body;

    if (!emailU || !contraseña) {
        res.status(400).json({
            success: false,
            message: "Debe ingresar el email o password"
        });
    } else {
        try {
            const user = await userModel.findOne({ emailU }).select("+contraseña");

            if (!user) {
                res.status(400).json({
                    success: false,
                    msg: "No se encontró el usuario"
                });
            } else {
                const isMatch = await user.comparePassword(contraseña);

                if (!isMatch) {
                    res.status(400).json({
                        success: false,
                        msg: "Contraseña incorrecta"
                    });
                } else {
                    // Verificar el rol antes de generar el token
                    if (user.rol === 'cliente' || user.rol === 'publicador') {
                        const token = user.ObtenerTokenJWT();
                        res.status(200).json({
                            success: true,
                            msg: "Contraseña correcta",
                            token: token,
                            rol:user.rol,
                            emailU:user.emailU
                        });
                    } else {
                        res.status(403).json({
                            success: false,
                            msg: "Acceso no autorizado"
                        });
                    }
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                msg: "Error en el servidor"
            });
        }
    }
});

module.exports = router