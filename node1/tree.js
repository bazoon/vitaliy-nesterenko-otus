const fs = require("fs");
const path = require("path");
const util = require("util");

let folder = process.argv[2];

if (!folder) {
  console.log("Укажите путь до папки!");
  process.exit(1);
}

if (folder.endsWith("/")) {
  folder = folder.slice(0, -1);
}

let tree = {};

const p = walk(folder, tree);
printTree(p);

function printTree(promise) {
  if (promise.then) {
    promise.then(p => {
      printTree(p);
    });
  } else {
    console.log(tree);
  }
}

function walk(dir, tree) {
  tree.dirs = tree.dirs || [];
  tree.files = tree.files || [];
  tree.dirs.push(dir);
  return new Promise((resolve, reject) => {
    // Требуется node версии 10.15
    fs.readdir(dir, { withFileTypes: true }, function(err, list) {
      if (!err) {
        const promises = list.map(f => {
          const fullPath = `${dir}/${f.name}`;

          if (f.isDirectory()) {
            return walk(fullPath, tree);
          } else {
            tree.files.push(fullPath);
            return Promise.resolve();
          }
        });
        return resolve(Promise.all(promises));
      } else {
        return resolve(Promise.resolve("ERROR: " + err));
      }
    });
  });
}
