require("dotenv").config()
const jwt = require("jsonwebtoken");
const { getUserAdmiDB } = require("../database/db");

const requiereAdmi = async(req,res, next) => {
    try {
        
        if (!req.headers?.authorization) {
            throw new Error("No existe el token");
        }
        const token = req.headers.authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
       
        const idUsuario = payload.id

        const respuesta = await getUserAdmiDB(idUsuario)

        console.log(respuesta.msg.tipo_usuario)
        if(respuesta.msg.tipo_usuario == 'administrador'){
          return  next()
        }
        return res.json({
            ok:false,
            msg: "No tienes autorizacion para ver esta vista"
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: error.message
        })
        }
    }

module.exports = requiereAdmi
