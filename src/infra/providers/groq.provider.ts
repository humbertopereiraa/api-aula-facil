import GroqSingleton from "./groqSingleton";

export class GroqProvider {
  async gerarPlano(prompt: string): Promise<string> {
    try {
      const groq = GroqSingleton.getInstance()
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4096,
      })

      let jsonString = response.choices[0].message.content || "{}";

      // 1. Limpar os marcadores de código Markdown (como você já fez)
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.substring(7);
      } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.substring(3);
      }
      if (jsonString.endsWith('```')) {
        jsonString = jsonString.substring(0, jsonString.length - 3);
      }

      // ✅ NOVO PASSO CRÍTICO: Limpar caracteres de controle não escapados
      // Isso remove qualquer quebra de linha (\n) ou retorno de carro (\r)
      // que esteja *dentro* dos valores das strings no JSON.
      // Isso impede o erro "Bad control character in string literal".
      jsonString = jsonString.replace(/[\n\r\t]/g, ' ');

      // 2. Remover espaços em branco no início e fim
      jsonString = jsonString.trim();

      return jsonString;
    } catch (error: any) {
      console.error(error)
      console.error("Erro ao gerar texto Groq:", error.message);
      throw new Error("Falha ao conectar à Groq API");
    }
  }
}
