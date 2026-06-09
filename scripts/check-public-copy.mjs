import { readFileSync } from "node:fs";

const files = ["index.html", "privacy.html"];
const forbidden = [
  "レシート OCR",
  "レシートOCR",
  "レシート",
  "OCR の実行",
  "OCRの実行",
  "Apple Vision",
  "完全ローカル",
  "ローカル動作",
  "レシート写真",
  "ゆうき",
  "あや",
];

const required = [
  "iCloud",
  "Kakewari独自サーバーに預けません",
];

let failed = false;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const word of forbidden) {
    if (text.includes(word)) {
      console.error(`${file}: forbidden copy remains: ${word}`);
      failed = true;
    }
  }
}

const combined = files.map((file) => readFileSync(file, "utf8")).join("\n");
for (const word of required) {
  if (!combined.includes(word)) {
    console.error(`required copy missing: ${word}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("public copy check passed");
