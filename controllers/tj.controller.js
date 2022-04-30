require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {nanoid} = require("nanoid");


const {getProductosDB, createUserDB, getUserMailDB, crearProductoDB, editarProductoDB, eliminarProductoDB, traernombreproductoDB, getUserAdmiDB} = require("../database/db")

const getProductos = async(req,res) => {
    const respuesta = await getProductosDB();
    if(!respuesta.ok){
        return res.status(500).json({
            ok:false,
            msg: respuesta.msg})
    }
    return res.json({
        ok:true,
        msg: respuesta.msg})

    }

const traerNombreP = async(req,res) => {
        const respuesta = await traernombreproductoDB();
        if(!respuesta.ok){
            return res.status(500).json({
                ok:false,
                msg: respuesta.msg})
        }
        return res.json({
            ok:true,
            msg: respuesta.msg})
    
        }


const createUser = async(req,res) => {
    const {nombre,apellido,password,email} = req.body;
    console.log(req.body)
    try {
        // validacion de campos
        if(!nombre?.trim() || !apellido?.trim() ||
        !password?.trim() || !email?.trim()){
            throw new Error("Todos los campos son obligatorios")
        }

        // reconocer si el usuario ya esta registrado
        const userResgitrado = await getUserMailDB(email)
        if(!userResgitrado.ok){
            throw new Error(userResgitrado.msg)
        }
        if(userResgitrado.msg){
            throw new Error("Este email ya esta registrado")
        }
        // hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        
        const respuesta = await createUserDB(nombre,apellido,hashPassword,email)
        if(!respuesta.ok) throw new Error(respuesta.msg);


        return res.json({
            ok:true,
            msg: respuesta.msg,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: error.message
        })
    }
}

const loginUser =  async(req,res) => {
    const {email, password} = req.body;
    try {
        if(!email?.trim() ||
        !password?.trim()){
            throw new Error("Todos los campos son obligatorios")
        }
        
        const respuesta = await getUserMailDB(email)
        if(!respuesta.ok){
            throw new Error(respuesta.msg)
        }
        if(!respuesta.msg){
            throw new Error("No existe el email registrado")
        }
        // validar que password coincide con el hash
        const {msg} = respuesta
        const comparePassword = await bcrypt.compare(password, msg.password)
        if(!comparePassword){ 
            throw new Error("Contraseña incorrecta")
         }

         // generar token
        const payload = {id : msg.id}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "24h"})

        return res.json({
            ok:true,
            token,
        })

    } catch (error) {
        // console.log(error)
    return res.status(400).json({
        ok:false,
        msg: error.message
    })
    }
}

const crearProducto = async(req,res) => {
    const {producto,descripcion,stock,valor} = req.body;
    // const {foto} = req.files;
    // console.log(req.files)
    // const mimetypes = ["image/jpeg", "image/png"]
    try {
        // validacion de campos
        if(!producto?.trim() || !descripcion?.trim() ||
        !stock?.trim() || !valor?.trim()){
            throw new Error("Todos los campos son obligatorios")
        }
        // if(!mimetypes.includes(foto.mimetype)){
        //     throw new Error("Debes seleccionar solo archivos jpeg o png")
        // }
        // // crear path para foto y guardarla en servidor 
        // const pathFoto = `${nanoid()}.${foto.mimetype.split("/")[1]}`
        // const rutaFoto = path.join(__dirname,"../public/img",pathFoto) //path.join para unir e interpretar ruta 
        
        // foto.mv(rutaFoto , (err) =>{
        //     if(err) throw new Error("Error al cargar la imagen")
            
        // })

        const respuesta = await crearProductoDB(producto,descripcion,stock,valor)
        if(!respuesta.ok) throw new Error(respuesta.msg);

        return res.json({
            ok:true,
            msg:respuesta.msg
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: error.message
        })
    }
}

const eliminarProducto = async(req,res) => {
    const {id} = req.params;
    try {
        const respuesta = await eliminarProductoDB(id)
        return res.json({
            ok:true,
            msg:respuesta.msg
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: error.message
        })
    }
}

const editarProducto = async(req,res) => {
    const {producto,descripcion,stock,valor} = req.body;
    console.log(req.body)
    try {
        // validacion de campos
        if(!producto?.trim() || !descripcion?.trim() ||
        !stock?.trim() || !valor?.trim()){
            throw new Error("Todos los campos son obligatorios")
        }

        const respuesta = await editarProductoDB(producto,descripcion,stock,valor)
        return res.json({
            ok:true,
            msg:respuesta.msg
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: error.message
        })
    }
}

const validarAdmi = async (req,res) => {
    try {
        if (!req.headers?.authorization) {
            throw new Error("No existe el token");
        }
        // console.log(req.headers.authorization.split(' ')[1])

        const token = req.headers.authorization.split(' ')[1]

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const idUsuario = payload.id

        const respuesta = await getUserAdmiDB(idUsuario)

        
        if(respuesta.msg.tipo_usuario == 'administrador'){
          return res.json({
            ok:true,
            msg: 'administrador'
        })
        }
        if(respuesta.msg.tipo_usuario == 'cliente'){
            return res.json({
                ok:false,
                msg: 'cliente'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: error.message
        })
    }
}


module.exports = {
    getProductos,
    traerNombreP,
    createUser,
    loginUser,
    crearProducto,
    eliminarProducto,
    editarProducto,
    validarAdmi
}


// const requiereAdmi = async(req,res, next) => {
//     try {
        
//         if (!req.headers?.authorization) {
//             throw new Error("No existe el token");
//         }
//         const token = req.headers.authorization.split(' ')[1]
//         const payload = jwt.verify(token, process.env.JWT_SECRET)
       
//         const idUsuario = payload.id

//         const respuesta = await getUserAdmiDB(idUsuario)

//         console.log(respuesta.msg.tipo_usuario)
//         if(respuesta.msg.tipo_usuario == 'administrador'){
//           return  next()
//         }
//         return res.json({
//             ok:false,
//             msg: "No tienes autorizacion para ver esta vista"
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({
//             ok:false,
//             msg: error.message
//         })
//         }
//     }