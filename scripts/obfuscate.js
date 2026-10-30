/* Minify + obfuscate the auth bundles so the login logic and password checks
 * are not human-readable in DevTools / view-source.
 *
 * Run by `npm run build` after Babel has produced ES5 output in build/.
 * Input stays ES5 (Chrome 45) so old smart TVs keep working.
 */
const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const targets = ["auth.js", "login.js"];
const buildDir = path.join(__dirname, "..", "build");

const options = {
  target: "browser",
  compact: true,
  simplify: true,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  splitStrings: false,
  stringArray: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayThreshold: 0.75,
  stringArrayEncoding: ["base64"],
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
};

for (const file of targets) {
  const fullPath = path.join(buildDir, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`obfuscate: missing ${fullPath} — run build:js first`);
    process.exit(1);
  }
  const source = fs.readFileSync(fullPath, "utf8");
  const result = JavaScriptObfuscator.obfuscate(source, options).getObfuscatedCode();
  fs.writeFileSync(fullPath, result, "utf8");
  console.log(
    `obfuscated build/${file}  ${source.length} -> ${result.length} bytes`,
  );
}
