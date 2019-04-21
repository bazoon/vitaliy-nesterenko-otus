const fs = require("fs");
const path = require("path");
const util = require("util");
const readdirP = util.promisify(fs.readdir);

const folder = process.argv[2] || "foo";
let tree = {};

// readdirP(folder, { withFileTypes: true }).then(list => {
//   console.log(list);
// });

const p = walk(folder, tree);
printTree(p);

function printTree(p) {
  if (p.then) {
    p.then(p1 => {
      printTree(p1);
    }).catch(e => {
      console.error(1111111, e);
    });
  } else {
    // console.log("DONE");
    console.log(tree);
  }
}

function walk(dir, tree) {
  // console.log(tree.files && tree.files.length);
  // console.log(`Processing ${dir}`);
  tree.dirs = tree.dirs || [];
  tree.dirs.push(dir);
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, function(err, list) {
      if (!err) {
        const promises = list.map(f => {
          const fullPath = dir + f.name;
          tree.files = tree.files || [];
          if (f.isDirectory()) {
            return walk(`${dir}/${f.name}`, tree);
          } else {
            tree.files.push(fullPath);
            return Promise.resolve({});
          }
        });
        return resolve(Promise.all(promises));
      } else {
        return resolve(Promise.resolve("ERROR: " + err));
      }
    });
  });
}

async function walk2(dir, tree) {
  console.log(dir);
  stack = [folder];
  return readdirP(folder, { withFileTypes: true }).then(list => {
    const promises = list.map(f => {
      const fullPath = dir + f.name;
      tree.files = tree.files || [];
      tree.files.push(fullPath);
      if (f.isDirectory()) {
        return walk2(`${dir}/${f.name}`, tree);
      } else {
        return Promise.resolve({});
      }
    });

    return Promise.all(promises);
  });
}
