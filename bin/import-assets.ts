import { readdir } from "fs/promises";
import { join } from "path";

class Asset {
  alias: string;
  path: string;

  constructor(alias: string, path: string) {
    this.alias = alias;
    this.path = path;
  }

  toString() {
    return `\t{ alias: "${this.alias}", src: ${this.alias} },`;
  }
}

type FileData = [Asset[], { [k: string]: any }];

function createPrefix(prefix: string, fileName: string) {
  if (prefix.length > 0) {
    prefix += "_";
  }

  return prefix + fileName;
}

function trimImportPath(path: string) {
  return path.replace(
    join(
      // @ts-ignore
      import.meta.dir,
      "..",
      "src"
    ),
    "."
  );
}

async function readAssetDir(
  path: string,
  prefix: string = ""
): Promise<FileData> {
  const assets: Asset[] = [];
  const fileStructure: FileData[1] = {};

  const files = await readdir(path, { withFileTypes: true });
  for (const file of files) {
    const fullPath = join(path, file.name);
    if (file.isDirectory()) {
      const [dirFiles, structure] = await readAssetDir(
        fullPath,
        createPrefix(prefix, file.name)
      );

      assets.push(...dirFiles);
      fileStructure[file.name] = structure;
    } else {
      const fileName = file.name.split(".").slice(0, -1).join();
      const alias = createPrefix(prefix, fileName);
      assets.push(new Asset(alias, trimImportPath(fullPath)));
      fileStructure[fileName] = alias;
    }
  }

  return [assets, fileStructure];
}

const assetPath = join(
  // @ts-ignore
  import.meta.dir,
  "..",
  "src",
  "assets"
);

const [files, keyEnum] = await readAssetDir(assetPath);

const importString = files.reduce((prev, curr) => {
  const importStatement = `import ${curr.alias} from "${curr.path}";\n`;
  const newText = prev + importStatement;

  return newText;
}, "");

const fileContent = `
${importString}
type Asset = {
  alias: string;
  src: string;
}

export const assets: Asset[] = [
${files.map((asset) => asset.toString()).join("\n")}
]

export const ASSET_KEYS = Object.freeze(
  ${JSON.stringify(keyEnum)}
)
`;

// @ts-ignore
await Bun.write(join(assetPath, "..", "assets.ts"), fileContent);
