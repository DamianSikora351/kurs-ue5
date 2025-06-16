const { NotionToMarkdown } = require("notion-to-md");
const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

// Inicjalizacja klienta Notion z kluczem API
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Lista stron do eksportu
const pages = [
  {
    id: "20f2d9bf43e68015a3c0e9429e0dd8c5",
    file: "docs/01-interfejs.md",
  },
  {
    id: "20f2d9bf43e680bc8314ce9ddcb2c714",
    file: "docs/02-materialy.md",
  },
  {
    id: "20f2d9bf43e6804b9b4ddfc85a5c9a71",
    file: "docs/03-assety.md",
  },
  {
    id: "20f2d9bf43e6801fbd8de5fb00688cdf",
    file: "docs/04-blueprinty.md",
  },
  {
    id: "20f2d9bf43e6805faba7fe524cd56969",
    file: "docs/05-optymalizacja.md",
  },
  {
    id: "20f2d9bf43e680c3ba40f092d89205b4",
    file: "docs/06-narzedzia.md",
  },
  {
    id: "20f2d9bf43e68014ade4f3f93f2aadda",
    file: "docs/07-zrodla.md",
  },
];

// Funkcja eksportująca wszystkie strony
(async () => {
  const n2m = new NotionToMarkdown({ notionClient: notion });

  for (const page of pages) {
    try {
      const mdblocks = await n2m.pageToMarkdown(page.id);
      const mdstring = n2m.toMarkdownString(mdblocks);
      const outputDir = path.dirname(page.file);
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(page.file, mdstring);
      console.log(`✅ Wyeksportowano do ${page.file}`);
    } catch (err) {
      console.error(`❌ Błąd eksportu ${page.file}:`, err.message);
    }
  }
})();
