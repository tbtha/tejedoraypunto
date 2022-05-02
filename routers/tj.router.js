const express = require("express");
const expressFileUpload = require("express-fileupload")

const { getProductos, createUser, loginUser, crearProducto, eliminarProducto, traerNombreP, validarAdmi } = require("../controllers/tj.controller");
const { infoUsuario, ordenCompra } = require("../controllers/usuarios.controller");
const requiereAut = require("../middlewares/requiereAutenticacion");


const router = express.Router();

router.use(expressFileUpload())
router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.get("/productos", requiereAut,getProductos)
router.get("/inicio",traerNombreP)
router.post("/createUser", createUser)
router.post("/login", loginUser)
router.post("/agregarProducto" ,crearProducto)
router.delete("/eliminarProducto/:id",eliminarProducto)
router.get("/administacion", validarAdmi)
router.get("/usuario", infoUsuario)
router.post("/correo", ordenCompra)


module.exports = router;