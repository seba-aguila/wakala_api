const { Router } = require("express");
const {
  createWakala,
  getWakalas,
  addComment,
  markIsNotThere,
  markStillThere
} = require("../controllers/wakalaControllers");

const router = Router();

router.post('/crearWakala', createWakala);
router.get('/obtenerWakalas', getWakalas);
router.post('/agregarComentario', addComment);
router.post('/marcarSigueAhi', markStillThere);
router.post('/marcarYaNoEsta', markIsNotThere);

module.exports = router;