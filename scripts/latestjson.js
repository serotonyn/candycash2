import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const pubDate = new Date().toISOString();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const name = packageJson.name;
const version = packageJson.version;

const sigName = `${name}_${version}_x64_en-US.msi.sig`;
const sigPath = path.join(
  __dirname,
  "..",
  "src-tauri",
  "target",
  "release",
  "bundle",
  "msi",
  sigName
);

const signature = fs.readFileSync(sigPath, "utf-8");
const url = `https://github.com/serotonyn/${name}-update/releases/download/latest/${name}_${version}_x64_en-US.msi`;

const outputDir = path.join(__dirname, "..", "out");

const latestJson = {
  version,
  notes: "",
  pub_date: pubDate,
  platforms: {
    "windows-x86_64": {
      signature,
      url,
    },
  },
};

fs.writeFileSync(
  path.join(outputDir, "latest.json"),
  JSON.stringify(latestJson, null, 2)
);
console.log("latest.json file has been generated");
