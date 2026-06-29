const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/estacionamentoController");

router.get("/andares",               ctrl.listarAndares);
router.get("/andares/:id/buscar",    ctrl.buscarVaga);
router.post("/andares/:id/ocupar",   ctrl.ocuparVaga);
router.post("/andares/:id/liberar",  ctrl.liberarVaga);

module.exports = router;
