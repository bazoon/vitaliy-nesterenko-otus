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
  const promises = fileList.map(file => {
    const fullPath = `${dir}/${file.name}`;

    if (file.isDirectory()) {
      return walk(fullPath, tree);
    } else {
      tree.files.push(fullPath);
    }
  });

  tree.dirs.push(dir);
  await Promise.all(promises);
  return tree;
}
