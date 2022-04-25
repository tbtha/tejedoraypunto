const express = require("express");
const { getProductos, createUser, loginUser, crearProducto } = require("../controllers/tj.controller");


const router = express.Router();


router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.get("/productos", getProductos)
router.post("/createUser", createUser)
router.post("/login", loginUser)
router.post("/agregarProducto", crearProducto)


module.exports = router;