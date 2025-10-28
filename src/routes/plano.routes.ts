import { Router } from "express";
import PlanoAulaController from "../controllers/plano.controller";

const planoAulaController = new PlanoAulaController()

const router = Router();
router.post("/gerar", planoAulaController.gerarPlano.bind(planoAulaController));

export default router;