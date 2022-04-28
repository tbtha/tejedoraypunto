const express = require("express");
const expressFileUpload = require("express-fileupload")

const { getProductos, createUser, loginUser, crearProducto, eliminarProducto } = require("../controllers/tj.controller");


const router = express.Router();

router.use(expressFileUpload())
router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.get("/productos", getProductos)
router.post("/createUser", createUser)
router.post("/login", loginUser)
router.post("/agregarProducto", crearProducto)
router.delete("/eliminarProducto/:id", eliminarProducto)


module.exports = router;