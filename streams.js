const fs = require("fs");

/**
 * Streams are a powerful way to handle data in Node.js. They allow us to read and write data in smaller chunks,
 * which can be more efficient than reading or writing large files in one go. There are four types of streams in
 * Node.js: Readable, Writable, Duplex, and Transform.
 */
const readStream = fs.createReadStream("./docs/blog3.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./docs/blog4.txt");

/*
readStream.on("data", (chunk) => {
  console.log("\n----- NEW CHUNK -----\n");

  // console.log(chunk.toString());
  console.log(chunk);

  // Writing to a stream within a stream allows us to process and write data as soon as it is available, rather than
  // waiting for the entire data to be ready before writing it to the file.
  writeStream.write("\n----- NEW CHUNK -----\n");
  writeStream.write(chunk);
});
*/

/**
 * piping the read stream to the write stream is a more efficient way to handle data, as it allows us to read and write
 * data in smaller chunks without having to manually handle the 'data' event and write to the stream ourselves.
 */
readStream.pipe(writeStream);

/**
 * Writing to a stream is more efficient than writing to a file in one go, especially for large files. This is because
 * it allows us to write data in smaller chunks, which can be processed and written to the file as soon as they are available,
 * rather than waiting for the entire data to be ready before writing it to the file.
 */

/*
const writeStream1 = fs.createWriteStream("./docs/blog4.txt");

writeStream1.write("Hello, world!\n");
writeStream1.write("Welcome to Node.js streams.\n");
writeStream1.end("This is the end of the stream.\n");
*/
