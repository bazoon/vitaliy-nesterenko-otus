const http = require("http");
const config = require("./config");
const { host, port } = config;

const commands = {
  "-t": {
    check: function(value) {
      return ["sequential", "parallel"].includes(value);
    }
  },
  "-n": {
    check: function(value) {
      return Number.isInteger(+value);
    }
  }
};

const options = process.argv;
const [cmd1, param1, cmd2, param2] = options.slice(2);

if (options.length < 4) {
  complain("Недостаточное количество опций!");
}

if (!commands[cmd1]) {
  complain(`Неизвестный флаг ${cmd1}`);
}

if (!commands[cmd2]) {
  complain(`Неизвестный флаг ${cmd2}`);
}

if (!commands[cmd1].check(param1)) {
  complain(`Недопустимый аргумент ${param1}`);
}

if (!commands[cmd2].check(param2)) {
  complain(`Недопустимый аргумент ${param2}`);
}

let type, numRequests;

if (cmd1 == "-t") {
  type = param1;
  numRequests = +param2;
} else {
  type = param2;
  numRequests = +param1;
}

if (type == "sequential") {
  runSequential(numRequests);
} else {
  runParallel(numRequests);
}

function complain(reason) {
  console.log(reason);
  help();
  process.exit(1);
}

function help() {
  console.log("Укажите тип запроса с помощью -t <sequential | parallel>");
  console.log("Укажите количество запросов с помощью -n <число запросов>");
}

function get() {
  return new Promise(resolve => {
    http.get(`http://${host}:${port}`, resp => {
      read(resp);
      resolve();
    });
  });
}

function runSequential(numRequests) {
  if (numRequests <= 0) return;
  let promise = get();
  promise.then(() => runSequential(numRequests - 1));
}

function runParallel(numRequests) {
  for (let i = 0; i < numRequests; i++) {
    get();
  }
}

function read(resp) {
  let data = "";
  resp.on("data", chunk => {
    data += chunk;
  });
  resp.on("end", () => {
    console.log("Received: " + data);
  });
}
