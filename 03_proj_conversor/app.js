const Reader = require("./Reader");
const Processor = require("./Processor");
const Table = require("./Table");
const HtmlParser = require("./HtmlParser");
const Writer = require("./Writer");
const PDFWriter = require("./PDFWriter");

const reader = new Reader();
const writer = new Writer();

async function main() {
  //lê arq.
  let data = await reader.Read("./user.csv");

  //converte em js (table)
  let dataProcessor = Processor.Process(data);
  let users = new Table(dataProcessor);

  //converte em html
  const html = await HtmlParser.Parse(users);

  //converte em pdf
  writer.Write(Date.now() + ".html", html);
  PDFWriter.WritePDF(Date.now() + ".pdf", html);
}

main();
