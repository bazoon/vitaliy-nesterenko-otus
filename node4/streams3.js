// Вариант похожий на предыдущий, но с
// ручным управлением чтением-записью

const { Readable } = require("stream");
const { Writable } = require("stream");

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
  highWaterMark: 2
});

const readable = new Readable({
  read(size) {
    this.push("very long string");
  }
});

readable.on("data", chunk => {
  const result = outStream.write(chunk);

  if (!result) {
    // Данные слишком велики для записи
    // поэтому тормозим поток чтения
    readable.pause();
    console.log("Backpreassure!");
  }
});

outStream.on("drain", () => {
  console.log("Drain!");
  // данные записаны, запрашиваем новые
  readable.resume();
});
