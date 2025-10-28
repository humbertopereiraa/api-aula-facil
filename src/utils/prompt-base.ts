import { PlanoDTO } from "../type/plano.dto";

export function montarPromptBase({
  tema,
  anoEscolar,
  duracao,
  inclusao,
  gerarQuiz
}: PlanoDTO) {
  const jsonSchema = `{
   "titulo": "",
   "objetivos": "",
   "habilidadesBNCC": "",
   "conteudo": "",
   "recursos": "",
    "metodologia": "",
    "etapas": {
      "introducao": "",
      "desenvolvimento": "",
      "fechamento": ""
    },
    "atividadePratica": "",
    "avaliacao": "",
    "tarefaCasa": "",
    "materiaisComplementares": "",
    "adaptacaoInclusao": "",
    "quiz": [
      {
        "pergunta": "",
        "alternativas": ["", "", "", ""],
        "respostaCorreta": ""
      }
    ]
  }`;

  let prompt = `
    Você é um Professor Doutor em Didática e Currículo (BNCC). Sua missão é criar planos de aula **extremamente detalhados, práticos e imediatamente aplicáveis** em sala de aula, usando uma abordagem sócio-construtivista.

    **Instrução Principal:** Cada campo do JSON deve ser preenchido com **o maior nível de detalhes, exemplos práticos, linguagem técnica-pedagógica de alto nível e referências reais possíveis**.

    Sua **única e estrita saída** deve ser o objeto JSON.

    [INFORMAÇÕES]
    [TEMA]: ${tema}
    [ANO ESCOLAR]: ${anoEscolar}
    [DURAÇÃO]: ${duracao} minutos

    **[INSTRUÇÕES OBRIGATÓRIAS DE CONTEÚDO E FORMATO]**

    1.  **"objetivos":** Use verbos de ação mensuráveis (Taxonomia de Bloom). Inclua pelo menos 1 objetivo geral e 2 específicos.
    2.  **"habilidadesBNCC":** Forneça o **CÓDIGO (Ex: EF05CI01)** e a **DESCRIÇÃO COMPLETA** da habilidade para o professor. Use 3 a 5 habilidades relevantes.
    3.  **"metodologia":** Descreva a abordagem pedagógica (Ex: Aprendizagem Baseada em Projetos, Rotação por Estações) e especifique o papel do aluno e do professor.
    4.  **"etapas":** Para CADA etapa (introdução, desenvolvimento, fechamento), inclua:
        a) O **tempo estimado** (Ex: 15 min).
        b) O **passo a passo detalhado** da interação (Perguntas-chave do professor, Ações do aluno).
    5.  **"atividadePratica":** Descreva a atividade de forma que possa ser executada imediatamente. Liste os materiais *específicos* necessários (Ex: 5 folhas de papel A4, 1 pote de cola, etc.).
    6.  **"avaliacao":** Especifique **quais** critérios e **como** serão avaliados (Ex: "Análise da Rubrica de Criação de Modelo" e "Observação da participação na discussão").
    7.  **"materiaisComplementares":**
        a) **OBRIGATÓRIO:** Inclua pelo menos **UM LINK DE VÍDEO REAL E RELEVANTE do YouTube** para o professor usar em sala (Ex: "Título do Vídeo - Link Curto do Youtube").
        b) **OBRIGATÓRIO:** Inclua a referência completa de **um livro didático ou artigo** que se relacione com o tema.

    [ESTRUTURA JSON OBRIGATÓRIA]
    ${jsonSchema}
  `;

  if (inclusao?.length) {
    prompt += `
    [ADAPTAÇÃO/INCLUSÃO]
    O campo **"adaptacaoInclusao"** deve ser preenchido com **sugestões CLARAS, PRÁTICAS e ESPECÍFICAS** para o professor aplicar as atividades e avaliação aos alunos com: ${inclusao.join(", ")}.
    `;
  }

  if (gerarQuiz) {
    prompt += `
    [QUIZ]
    O array **"quiz"** deve conter 10 perguntas de múltipla escolha. A dificuldade das perguntas deve ser adequada ao **${anoEscolar}**.
    `;
  } else {
    prompt += `
     O campo "quiz" deve ser um array vazio [].
     `;
  }

    if (gerarQuiz) {
    prompt += `
    [QUIZ]
    Crie um quiz com 10 perguntas sobre o tema "${tema}" com dificuldade das perguntas deve ser adequada para alunos do ${anoEscolar}.
    Cada pergunta deve ter 4 alternativas e uma resposta correta destacada.
    Formato:
    1. Pergunta
    a)
    b)
    c)
    d)
    Resposta correta: [letra]
    `;
  }

  prompt += `
    Preencha todos os campos do JSON com conteúdo relevante, respeitando as informações [INFORMAÇÕES] e as instruções.
  `;
  return prompt;
}