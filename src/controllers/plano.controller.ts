import { Request, Response } from "express";
import PlanoAulaService from "../services/ia.service";

export default class PlanoAulaController {
  async gerarPlano(req: Request, res: Response) {
    try {
      console.log(req.body)
      const { tema, anoEscolar, duracao, inclusao } = req.body;

      if (!tema || !anoEscolar || !duracao) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
      }

      const planoAulaService = new PlanoAulaService()
      const plano = await planoAulaService.gerar({ tema, anoEscolar, duracao, inclusao });

      res.json({ plano });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao gerar plano de aula." });
    }
  }
}