const fs = require("fs");
const util = require("util");
const readdirP = util.promisify(fs.readdir);

let folder = process.argv[2];

if (!folder) {
  console.log("Укажите путь до папки!");
  process.exit(1);
}

if (folder.endsWith("/")) {
  folder = folder.slice(0, -1);
}

walk(folder).then(r => {
  console.log(r);
});

async function walk(dir, tree = { dirs: [], files: [] }) {
  const fileList = await readdirP(dir, { withFileTypes: true });
  const promises = fileList.map(async file => {
    const fullPath = `${dir}/${file.name}`;

    if (file.isDirectory()) {
      return await walk(fullPath, tree);
    } else {
      return { ...tree, files: [...tree.files, fullPath] };
    }
  });

  const resultTree = { ...tree, dirs: [...tree.dirs, dir] };
  const subTrees = await Promise.all(promises);

  subTrees.forEach(({ dirs = [], files = [] }) => {
    resultTree.dirs = [...resultTree.dirs, ...dirs];
    resultTree.files = [...resultTree.files, ...files];
  });

  return resultTree;
}
