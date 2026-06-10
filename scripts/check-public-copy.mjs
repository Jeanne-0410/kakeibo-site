import { readFileSync } from "node:fs";

const files = ["index.html", "privacy.html", "terms.html"];
const legalFiles = ["privacy.html", "terms.html"];
const expectedLegalUpdatedDate = "最終更新日: 2026-06-10";
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
  "20 個まで",
  "直近 3 ヶ月",
];

const required = [
  "iCloud",
  "Kakewari独自サーバーに預けません",
  "25 個まで",
  "直近 6 ヶ月",
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

for (const file of legalFiles) {
  const text = readFileSync(file, "utf8");
  if (!text.includes(expectedLegalUpdatedDate)) {
    console.error(`${file}: legal updated date is not current: ${expectedLegalUpdatedDate}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("public copy check passed");
