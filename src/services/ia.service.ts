import { PlanoDTO } from "../type/plano.dto";
import { GroqProvider } from "../infra/providers/groq.provider";
import { montarPromptBase } from "../utils/prompt-base";

export default class PlanoAulaService {
  constructor(private readonly iaProvider = new GroqProvider()) { }

  public async gerar(dados: PlanoDTO): Promise<any> {
    const { tema, anoEscolar, duracao, inclusao } = dados;

    const prompt = montarPromptBase({
      tema,
      anoEscolar,
      duracao,
      inclusao,
      gerarQuiz: true
    })

    const jsonString = await this.iaProvider.gerarPlano(prompt);

    return JSON.parse(jsonString);
  }
}