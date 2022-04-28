const express = require("express");

const router = express.Router();




router.get("/registro", (req,res) => res.render("registro"))
router.get("/admi", (req,res) => res.render("admi"))
router.get("/login", (req,res) => res.render("login"))
router.get("/", (req,res) => res.render("inicio"))
router.get("/productos", (req,res) => res.render("productos"))




module.exports = router;
