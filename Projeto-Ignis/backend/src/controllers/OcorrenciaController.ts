import { Request, Response } from "express";
import { query } from "../database/db";

class OcorrenciaController {
  public async Filtrar_grafico(req: Request, res: Response): Promise<void> {
    try {
      const { tipo, escopo, dataInicio, dataFim } = req.query;

      if (!tipo || !escopo || !dataInicio || !dataFim) {
        return res.status(400).json({ erro: "Todos os filtros são obrigatórios." });
      }

      let baseQuery = "";
      if (tipo === 'area_queimada') {
        baseQuery = `
          SELECT a.data_pas AS data, SUM(a.area_queimada) AS area_queimada, SUM(a.frp) AS frp, SUM(a.risco) AS risco_fogo
          FROM Area_Queimada a
          WHERE 1=1
        `;
      } else if (tipo === 'foco_calor') {
        baseQuery = `
          SELECT f.data_hora_t3::date AS data, SUM(f.frp) AS frp, SUM(f.risco_fogo) AS risco_fogo
          FROM Foco_Calor f
          WHERE 1=1
        `;
      } else if (tipo === 'risco_fogo') {
        baseQuery = `
          SELECT r.data AS data, AVG(r.risco_fogo) AS risco_fogo
          FROM Risco r
          WHERE 1=1
        `;
      } else {
        return res.status(400).json({ erro: "Tipo inválido." });
      }

      const values: any[] = [];

      if (escopo === 'estados') {
        baseQuery += ` AND estado_id IS NOT NULL`;
      } else if (escopo === 'biomas') {
        baseQuery += ` AND bioma_id IS NOT NULL`;
      }

      if (dataInicio) {
        baseQuery += ` AND data >= $${values.length + 1}`;
        values.push(dataInicio);
      }

      if (dataFim) {
        baseQuery += ` AND data <= $${values.length + 1}`;
        values.push(dataFim);
      }

      baseQuery += ` GROUP BY data ORDER BY data ASC`;

      const resultado = await query(baseQuery, values);
      res.json(resultado);
    } catch (err: any) {
      console.error("Erro ao buscar gráfico:", err);
      res.status(500).json({ erro: "Erro ao buscar gráfico", detalhes: err.message });
    }
  }
}

export default new OcorrenciaController();
