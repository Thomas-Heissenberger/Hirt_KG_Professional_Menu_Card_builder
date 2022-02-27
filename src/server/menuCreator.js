const fs = require("fs");
const path = require("path");
const http = require("http");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const dotenv = require("dotenv");

//* Setup/Config------------------------------------------------------------------------------------------------
dotenv.config();
const SERVERPORT = process.env.SERVERPORT;
const INPUTDIRECTORY = process.env.INPUTDIRECTORY;
const OUTPUTDIRECTORY = process.env.OUTPUTDIRECTORY;
const EXTENSION = process.env.EXTENSION;
const Paths = {
  TemplateDocx: path.resolve(
    INPUTDIRECTORY,
    process.env.TEMPLATEFILENAME + EXTENSION
  ),
  ResultDocx: path.resolve(
    OUTPUTDIRECTORY,
    process.env.RESULTFILENAME + EXTENSION
  ),
  JSONData: path.resolve(INPUTDIRECTORY, process.env.JSONFILENAME + ".json"),
  PDFFile: path.resolve(OUTPUTDIRECTORY, process.env.RESULTFILENAME + ".pdf"),
  PNGFile: path.resolve(OUTPUTDIRECTORY, process.env.OUTPUTDIRECTORY + ".png"),
};

let content;
//* Setup/Config------------------------------------------------------------------------------------------------

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, POST");
    let msg = "";
    console.log(req.method);
    let url= new URL(req.url, `http://${req.headers.host}`);
      switch (req.method) {
        case "POST":
          content = fs.readFileSync(Paths.TemplateDocx);
          let zip = new PizZip(content);
          let doc = new Docxtemplater();

          msg = "POST";
        doPost(req, res);
        break;
        case "GET":
        msg = "GET";
        doGet(res);
        break;
        default:
        msg = "fuckyou";
        res.end(msg);
        break;
      }
    })
  .listen(SERVERPORT, () => {
    console.log(`menuCreator running at http://localhost:${SERVERPORT}`);
  });

function doPost(req, res) {
  createDocx(req, res)
  .then(({req, res}) => executePowershell(req,res))
    .then(({req, res}) => preparePDFBody(req,res))
    .then(({req,res})=>res.end("leinwand oida"))
    .catch((error)=>{console.log(error); res.end("i hoss di, wegn dia is da server gstorbn")});
}

function doGet(res) {
  readFilePromise((data) => {
    //TODO: do cool stuff
    res.end(JSON.stringify(data));
  });
}

function createDocx(req, res) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        data = JSON.parse(data);
        doc.loadZip(zip);
        doc.setData(data);
        doc.render();
      } catch (error) {
        reject(error);
      }
      let buf = doc.getZip().generate({ type: "nodebuffer" });
      fs.writeFileSync(Paths.ResultDocx, buf);
      resolve({req, res});
    });
 });
}


function executePowershell(req, res) {
  return new Promise((resolve, reject) => {
    let spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [process.cwd() + "/docx2pdf.ps1"]);
    child.stdout.on("data", (data) => console.log("Powershell Data: " + data));
    child.stderr.on("data", (data) => {
      console.log("Powershell Errors: " + data);
      reject(data);
    });
    child.on("exit", () => {
      console.log("Powershell Script finished");
      resolve({req, res});
    });
    child.stdin.end();
  });
}

function preparePDFBody(req, res){
  return new Promise((resolve, reject)=>{
    res.setHeader('Content-Type', 'application/pdf');
    fs.readFile(Paths.PDFFile, (err, data)=>{
      if(err)reject(err);
      res.write(data, 'binary');
      resolve({req, res});  
    });
  });
}

function readFilePromise(useDataCallback) {
  new Promise((res, rej) => {
    fs.readFile(Paths.JSONData, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  })
    .then((data) => {
      useDataCallback(JSON.parse(data));
    })
    .catch((err) => console.log(err));
}
