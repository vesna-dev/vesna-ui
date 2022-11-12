const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");
const { Generator } = require("npm-dts");
const { watch } = require("chokidar");

const buildAll = () => {
  const sharedOptions = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  };

  console.log("Building browser bundle...");
  build({
    ...sharedOptions,
    outfile: "dist/index.js",
  });

  console.log("Building ESM bundle...");
  build({
    ...sharedOptions,
    outfile: "dist/index.esm.js",
    format: "esm",
  });

  console.log("Generating typings...");
  new Generator({
    entry: "src/index.ts",
    output: "dist/index.d.ts",
  }).generate();
};

buildAll();

watch("./src").on("all", (event, path) => {
  buildAll();
});
