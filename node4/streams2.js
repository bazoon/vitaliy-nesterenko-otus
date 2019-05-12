const { Readable } = require("stream");
const { Writable } = require("stream");

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
  // Устанавливаем небольшое значение
  highWaterMark: 2
});

// Это событие сработает после первой же записи
// что возникает в случае если highWaterMark меньше чем размер пришедших
// данных
outStream.on("drain", () => {
  console.log("DRAIN!!!");
});

const readable = new Readable({
  read(size) {
    this.push("Very long string");
  }
});

readable.pipe(outStream);
