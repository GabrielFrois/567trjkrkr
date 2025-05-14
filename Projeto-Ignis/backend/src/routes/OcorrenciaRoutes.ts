import { Router } from "express";
import OcorrenciaController from "../controllers/OcorrenciaController";

const router = Router();

// 🌡️ Rota para risco de fogo
router.get("/risco", OcorrenciaController.Filtrar_risco_fogo);

// 🔥 Rota para foco de calor
router.get("/foco_calor", OcorrenciaController.Filtrar_foco_calor);

// 🔥 Rota para área queimada
router.get("/area_queimada", OcorrenciaController.Filtrar_area_queimada);

// 📊 Rota para gráficos gerais (usada por FiltroGrafico)
router.get("/grafico", OcorrenciaController.Filtrar_grafico);

export default router;
