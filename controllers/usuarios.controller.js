require("dotenv").config()
const jwt = require("jsonwebtoken")

const {getUserDB} = require("../database/db")
const enviar = require("../nodemailer/nodemailer")

const infoUsuario = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const idUsuario = payload.id

        const respuesta = await getUserDB (idUsuario)

        return res.json({
            ok:true,
            msg: respuesta.msg
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: error.message
        })
    }
}

const ordenCompra = async (req,res) => {
    const {email, nombre, apellido} = req.body;
    try {
        const subject = `Bienvenido a Tejedora y Punto `
        const html = `
        <h5>Hola ${nombre} ${apellido}</h5>
        <p>Hemos recibido correctamente tu pedido </p>
        <p>Este es el ID de tu compra: +compra.id</p>
        
        <p>Para finalizar tu compra, te dejamos los datos de transferencia para que hagas el pago de tu pedido a la siguientes cuenta</p>
        
        
        <p>Una vez realizada la transferencia, debes enviar tu comprobante de pago al correo tejedoraypunto@hotmail.com y en el asunto indicar el ID de tu compra para 
        validar el pago y gestion a la brevedad la entrega de tu/tus productos </p>
        <br>
        <p>Agredecemos tu preferencia</p>
        
        <h5>Atte:</5>
        <h5>Equipo Tejedora y Punto </h5>
        `
        const respuesta = await enviar(email,subject,html)
        if(!respuesta.ok) console.log(respuesta.msg)
        if(respuesta.ok) console.log(respuesta.msg)
       
        return res.json({
            ok:true,
            msg: respuesta.msg
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: error.message
        })
    }
}



module.exports = {
    infoUsuario,
    ordenCompra
}