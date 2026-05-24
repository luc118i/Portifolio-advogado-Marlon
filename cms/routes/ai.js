// ═══════════════════════════════════════════════════════════════
// routes/ai.js — POST /api/ai/generate · POST /api/ai/humanize
// Para adicionar novos modos de geração: adicione em PROMPTS
// Para trocar o modelo: mude MODEL
// ═══════════════════════════════════════════════════════════════

const express = require('express');

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL    = 'llama-3.3-70b-versatile';

async function callGroq(apiKey, prompt, maxTokens = 300, temperature = 0.85) {
  const response = await fetch(GROQ_URL, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:       MODEL,
      messages:    [{ role: 'user', content: prompt }],
      max_tokens:  maxTokens,
      temperature,
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content.trim();
}

// ─── Prompts por modo ─────────────────────────────────────────
function buildPrompt(mode, { category, headline, topic, exclude }) {
  const excludeClause = exclude?.trim()
    ? `\nTemas JÁ ABORDADOS PELO CLIENTE (não repita nem variações próximas destes): "${exclude.trim()}".\nSugira APENAS temas completamente diferentes e frescos.\n`
    : '';

  const prompts = {
    headline: `Você é um especialista em marketing jurídico brasileiro.
Crie UM headline curto e impactante (máximo 10 palavras) para um slide de carrossel na área de ${category}.
Assunto: "${topic || category}".
O headline deve despertar curiosidade ou urgência no leitor leigo.
Retorne APENAS o headline, sem aspas, sem explicações.`,

    body: `Você é um especialista em marketing jurídico brasileiro.
Escreva o texto de corpo para um slide jurídico. Máximo 2 frases curtas e diretas.
Área: ${category}.
Headline do slide: "${headline || topic}".
Público: pessoas comuns sem conhecimento jurídico.
Linguagem: simples, direta, levemente urgente.
Retorne APENAS as 2 frases, sem explicações.`,

    idea: `Você é um especialista em conteúdo jurídico digital brasileiro.
Sugira 3 ideias ORIGINAIS e DIFERENTES entre si de post (carrossel) para um advogado na área de ${category}.
${excludeClause}Cada ideia deve ter: título gancho + 1 linha de descrição.
Formato:
1. [Título] — [descrição]
2. [Título] — [descrição]
3. [Título] — [descrição]
Retorne APENAS as 3 ideias, sem introdução, sem comentários extras.`,
  };
  return prompts[mode] || null;
}

const HUMANIZE_PROMPT = (text) => `Você é um editor especializado em tornar textos mais humanos e naturais.
Reescreva o texto abaixo removendo padrões típicos de IA:

REGRAS:
- Proibido usar: "fundamental", "crucial", "essencial", "primordial", "robusto", "eficaz", "garantir", "ressaltar", "destacar", "é importante salientar", "no contexto atual", "vale mencionar", "cabe destacar", "é válido", "em suma", "portanto,", "nesse sentido"
- Evite estruturas simétricas demais (listas paralelas, frases do mesmo tamanho)
- Escreva como um advogado experiente falando diretamente com seu cliente
- Linguagem direta, sem rodeios, sem firula corporativa
- Mantenha o mesmo tamanho aproximado e o mesmo significado
- Sem formalidade excessiva — próximo, humano, confiante

TEXTO:
${text}

Retorne APENAS o texto reescrito, sem explicações, sem aspas.`;

// ─── Rotas ────────────────────────────────────────────────────
module.exports = function aiRouter(loadConfig) {
  const router = express.Router();

  router.post('/generate', async (req, res) => {
    const cfg = loadConfig();
    if (!cfg.groq_api_key)
      return res.status(401).json({ error: 'Configure a chave da Groq primeiro.' });

    const { mode, category, headline, topic, exclude } = req.body;
    const prompt = buildPrompt(mode, { category, headline, topic, exclude });
    if (!prompt) return res.status(400).json({ error: 'Modo inválido.' });

    try {
      const text = await callGroq(cfg.groq_api_key, prompt);
      res.json({ text });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao chamar a Groq: ' + err.message });
    }
  });

  router.post('/humanize', async (req, res) => {
    const cfg = loadConfig();
    if (!cfg.groq_api_key)
      return res.status(401).json({ error: 'Configure a chave da Groq primeiro.' });

    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ error: 'Texto vazio.' });

    try {
      const result = await callGroq(cfg.groq_api_key, HUMANIZE_PROMPT(text), 500, 0.75);
      res.json({ text: result });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao chamar a Groq: ' + err.message });
    }
  });

  return router;
};
