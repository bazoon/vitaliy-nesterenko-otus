const { Readable } = require("stream");
const { Writable } = require("stream");
const { Transform } = require("stream");

const randomReadable = new Readable({
  read(size) {
    this.push(Math.random() + "");
  }
});

const transformable = new Transform({
  transform(chunk, encoding, callback) {
    const transformedChunk = (+chunk.toString() + Math.random()).toString();
    this.push(transformedChunk);
    callback();
  }
});

const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

randomReadable.pipe(transformable).pipe(writable);
