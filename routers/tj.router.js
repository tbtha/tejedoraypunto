const express = require("express");
const expressFileUpload = require("express-fileupload")

const { getProductos, createUser, loginUser, crearProducto, eliminarProducto, traerNombreP } = require("../controllers/tj.controller");
const requiereAdmi = require("../middlewares/requiereAdmi");
const requiereAut = require("../middlewares/requiereAutenticacion");


const router = express.Router();

router.use(expressFileUpload())
router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.get("/productos", requiereAut,getProductos)
router.get("/inicio",traerNombreP)
router.post("/createUser", createUser)
router.post("/login", loginUser)
router.post("/agregarProducto",requiereAdmi ,crearProducto)
router.delete("/eliminarProducto/:id", requiereAdmi,eliminarProducto)


module.exports = router;