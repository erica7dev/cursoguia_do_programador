const fs = require("fs");
const util = require("util"); //pra poder usar promise com o file system

class Reader {
  constructor() {
    this.reader = util.promisify(fs.readFile);
  }
  F;

  async Read(filepath) {
    try {
      return await this.reader(filepath, "utf8");
    } catch (error) {
      return undefined;
    }
  }
}

module.exports = Reader;
