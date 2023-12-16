const { Router } = require("express");
const { createUser } = require("../controllers/userControllers");

const router = Router();

router.post('/crearUsuario', createUser);

module.exports = router;