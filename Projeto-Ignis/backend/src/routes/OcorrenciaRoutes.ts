import { Router } from "express";
import OcorrenciaController from "../controllers/OcorrenciaController";

const router = Router();

router.get("/grafico", OcorrenciaController.Filtrar_grafico);

export default router;
