const fs = require("node:fs");
const path = require("node:path");

/**
 * Service class for file operations using streams
 */
class FileService {
  /**
   * Read file contents using streams
   * @param {string} filePath - Path to the file
   * @returns {Promise<string>} - File contents
   */
  static readFile(filePath) {
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(__dirname, "../../", filePath);
      const chunks = [];

      const readStream = fs.createReadStream(absolutePath, {
        encoding: "utf8",
      });

      readStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      readStream.on("end", () => {
        resolve(chunks.join(""));
      });

      readStream.on("error", (error) => {
        if (error.code === "ENOENT") {
          reject(new Error("File not found"));
        } else {
          reject(new Error(`Failed to read file: ${error.message}`));
        }
      });
    });
  }

  /**
   * Write data to file using streams
   * @param {string} filePath - Path to the file
   * @param {string} data - Data to write
   * @returns {Promise<void>}
   */
  static writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(__dirname, "../../", filePath);

      const writeStream = fs.createWriteStream(absolutePath, {
        encoding: "utf8",
      });

      writeStream.write(data);
      writeStream.end();

      writeStream.on("finish", () => {
        resolve();
      });

      writeStream.on("error", (error) => {
        reject(new Error(`Failed to write file: ${error.message}`));
      });
    });
  }

  /**
   * Check if file exists
   * @param {string} filePath - Path to the file
   * @returns {boolean} - True if file exists
   */
  static fileExists(filePath) {
    const absolutePath = path.resolve(__dirname, "../../", filePath);
    return fs.existsSync(absolutePath);
  }
}

module.exports = FileService;
