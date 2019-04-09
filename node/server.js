const http = require("http");
const config = require("./config");
const { host, port, delay } = config;
let count = 0;

const server = http.createServer((req, res) => {
  setTimeout(() => {
    const text = `Response # ${count++}`;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    console.log(`Sending: ${text}`);
    res.end(text);
  }, delay);
});

server.listen(port, host, () => {
  console.log(`Server running at port ${host}:${port}/`);
});
