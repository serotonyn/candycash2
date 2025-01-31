import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Read tauri.conf.json
const tauriConfPath = path.join(
  __dirname,
  "..",
  "src-tauri",
  "tauri.conf.json"
);
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, "utf-8"));

// read Cargo.toml
const cargoTomlPath = path.join(__dirname, "..", "src-tauri", "Cargo.toml");
const cargoToml = fs.readFileSync(cargoTomlPath, "utf-8");

// Bump version
packageJson.version = packageJson.version.replace(
  /\d+$/,
  (x) => parseInt(x) + 1
);

tauriConf.version = packageJson.version;

// update Cargo.toml
const cargoTomlLines = cargoToml.split("\n");
const cargoTomlLinesUpdated = cargoTomlLines.map((line) => {
  if (line.startsWith("version")) {
    return `version = "${packageJson.version}"`;
  }
  return line;
});

// Write tauri.conf.json
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2));
console.log("tauri.conf.json file has been updated");

// Write package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("package.json file has been updated");

const cargoTomlUpdated = cargoTomlLinesUpdated.join("\n");
fs.writeFileSync(cargoTomlPath, cargoTomlUpdated);
console.log("Cargo.toml file has been updated");
