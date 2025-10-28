export interface PlanoDTO {
  tema: string;
  anoEscolar: string;
  duracao: string;
  inclusao?: string[];
  gerarQuiz?: boolean;
}