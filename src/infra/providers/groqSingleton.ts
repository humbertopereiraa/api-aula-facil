import { Groq } from 'groq-sdk';

/**
 * Classe Singleton para a conexão com a Groq API.
 * Garante que apenas uma instância de 'Groq' seja criada e reutilizada.
 */
export default class GroqSingleton {
  private static instance: Groq;

  private constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY não está definida nas variáveis de ambiente.");
    }

    GroqSingleton.instance = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }

  public static getInstance(): Groq {
    if (!GroqSingleton.instance) {
      new GroqSingleton();
    }
    return GroqSingleton.instance;
  }
}