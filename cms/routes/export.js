// ═══════════════════════════════════════════════════════════════
// routes/export.js — POST /api/export/images · POST /api/export/docx
// Salva imagens dos slides (carrossel) e DOCX (artigo) na pasta local
// Para ajustar o estilo do DOCX: edite a função buildDoc()
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const path    = require('path');
const fs      = require('fs');

module.exports = function exportRouter(loadConfig) {
  const router = express.Router();

  // ─── POST /api/export/images ─────────────────────────────────
  // Recebe array de { name, data (base64 PNG) } e salva em
  // [output_folder]/[slug]/slide-01.png, slide-02.png, …, cta.png
  router.post('/images', (req, res) => {
    const cfg = loadConfig();
    if (!cfg.output_folder)
      return res.status(400).json({ error: 'Pasta de exportação não configurada.' });

    const { slug, images } = req.body;
    if (!images?.length)
      return res.status(400).json({ error: 'Nenhuma imagem recebida.' });

    const folder = path.join(cfg.output_folder, slug);
    try {
      fs.mkdirSync(folder, { recursive: true });
    } catch (err) {
      return res.status(500).json({ error: 'Não foi possível criar a pasta: ' + err.message });
    }

    const saved = [];
    try {
      for (const { name, data } of images) {
        const base64   = data.replace(/^data:image\/\w+;base64,/, '');
        const buffer   = Buffer.from(base64, 'base64');
        const filePath = path.join(folder, name);
        fs.writeFileSync(filePath, buffer);
        saved.push(name);
      }
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao salvar imagem: ' + err.message });
    }

    res.json({ success: true, folder, saved });
  });

  // ─── POST /api/export/docx ────────────────────────────────────
  // Gera um arquivo .docx com o conteúdo do artigo e salva em
  // [output_folder]/[slug].docx
  router.post('/docx', async (req, res) => {
    const cfg = loadConfig();
    if (!cfg.output_folder)
      return res.status(400).json({ error: 'Pasta de exportação não configurada.' });

    const { slug, title, category, date, readTime, excerpt, content } = req.body;

    try {
      const {
        Document, Packer, Paragraph, TextRun,
        HeadingLevel, BorderStyle,
      } = require('docx');

      const bodyParas = (content || '')
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map(text => new Paragraph({ text, spacing: { after: 180 } }));

      const doc = new Document({
        creator:     'Dr. Marlon Inácio — CMS',
        title,
        description: excerpt || '',
        sections: [{
          properties: {},
          children: [
            // Título
            new Paragraph({
              text,
              heading:  HeadingLevel.HEADING_1,
              spacing:  { after: 200 },
              children: [new TextRun({ text: title })],
            }),
            // Metadados (categoria · data · tempo de leitura)
            new Paragraph({
              spacing: { after: 300 },
              children: [
                new TextRun({ text: category, color: '888888', size: 20 }),
                new TextRun({ text: '  ·  ',  color: 'aaaaaa', size: 20 }),
                new TextRun({ text: date,     color: '888888', size: 20 }),
                ...(readTime ? [
                  new TextRun({ text: '  ·  ',  color: 'aaaaaa', size: 20 }),
                  new TextRun({ text: readTime, color: '888888', size: 20 }),
                ] : []),
              ],
            }),
            // Resumo em destaque (linha dourada na lateral)
            ...(excerpt ? [
              new Paragraph({
                spacing: { after: 300 },
                border: {
                  left: {
                    style: BorderStyle.SINGLE,
                    size: 6, color: 'C9A96E', space: 8,
                  },
                },
                children: [
                  new TextRun({ text: excerpt, italics: true, color: '444444', size: 22 }),
                ],
              }),
            ] : []),
            // Corpo do artigo
            ...bodyParas,
          ],
        }],
      });

      const buffer   = await Packer.toBuffer(doc);
      const fileName = `${slug}.docx`;
      const filePath = path.join(cfg.output_folder, fileName);
      fs.mkdirSync(cfg.output_folder, { recursive: true });
      fs.writeFileSync(filePath, buffer);

      res.json({ success: true, path: filePath, fileName });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao gerar DOCX: ' + err.message });
    }
  });

  return router;
};
