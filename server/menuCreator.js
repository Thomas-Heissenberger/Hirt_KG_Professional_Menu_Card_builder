const fs = require("fs");
const path = require("path");
const http = require("http");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const dotenv = require("dotenv");
//const { buildInputFile, loadImageElement, executeAndReturnOutputFile } = require("wasm-imagemagick");
//const imageMagick = require("image-magick");

//* Setup/Config------------------------------------------------------------------------------------------------
dotenv.config();
//TODO: Paths in docx2pdf.ps1 to read from .env file are done statically
const SERVERPORT = process.env.SERVERPORT;
const OUTPUTDIRECTORY = process.env.OUTPUTDIRECTORY;
const EXTENSION = process.env.EXTENSION;
const Paths = {
  TemplateDocx: path.resolve(
    process.env.INPUTDIRECTORY,
    process.env.TEMPLATEFILENAME + EXTENSION
  ),
  ResultDocx: path.resolve(
    OUTPUTDIRECTORY,
    process.env.RESULTFILENAME + EXTENSION
  ),
  JSONData: path.resolve(OUTPUTDIRECTORY, process.env.JSONFILENAME + ".json"),
  PDFFile: path.resolve(OUTPUTDIRECTORY, process.env.RESULTFILENAME + ".pdf"),
  PNGFile: path.resolve(OUTPUTDIRECTORY, process.env.OUTPUTDIRECTORY + ".png"),
  PowershellScript: path.resolve(process.env.INPUTDIRECTORY, "docx2pdf.ps1"),
};

//let content = fs.readFileSync(Paths.TemplateDocx);
//let zip = new PizZip(content);
//let doc = new Docxtemplater();
//* Setup/Config------------------------------------------------------------------------------------------------
let doc,zip,content;
http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, POST");
    let msg = "";
    content = fs.readFileSync(Paths.TemplateDocx);
    zip = new PizZip(content);
    doc = new Docxtemplater();
    switch (req.method) {
      case "POST":
        msg = "POST";
        doPost(req, res);
        break;
      case "GET":
        console.log(req.url)
        if(req.url==="/data"){
          getData(res);
        }else if(req.url==="/pdf"){
          console.log("pdf")
          getPDF(res);
        }else{
          msg = "GET";
          res.end(JSON.stringify(msg));  
        }
        break;
      default:
        msg = "fuckyou";
        res.end(JSON.stringify(msg));
        break;
    }
  })
  .listen(SERVERPORT, () => {
    console.log(`menuCreator running at http://localhost:${SERVERPORT}`);
  });

function doPost(req, res) {
  createDocxFromRequest(req, res)
    .then(({req, res}) => executePowershell(req,res))
    .then(({req, res}) => preparePDFBody(req,res))
    .then(({req, res})=>res.end("leinwand oida"))
    .catch((error)=>{console.log(error); res.end("i hoss di, wegn dia is da server gstorbn")});
}

function getPDF(res) {
  readFilePromise((data) => {
    createDocxFromJSON(res, data)
      .then(({data, res}) => executePowershell(data,res))
      .then(({data, res}) => preparePDFBody(data,res))
      .then(({data, res}) => res.end(`${"test"}` ))
      .catch(error=>{console.log(error); res.end("server died while processing get")})
    //createPNG(); => not used as we generate pdfs anyways
  });
}

function getData(res){
  readFilePromise((data)=>res.end(JSON.stringify(data)));
}

function createDocxFromRequest(req, res) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        //console.log(JSON.parse(data));
        processData(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
      let buf = doc.getZip().generate({ type: "nodebuffer" });
      fs.writeFileSync(Paths.ResultDocx, buf);
      resolve({req, res});
    });
 });
}

function createDocxFromJSON(res, json) {
  return new Promise((resolve, reject) => {
      try {
        processData(json);
        let buf = doc.getZip().generate({ type: "nodebuffer" });
        fs.writeFileSync(Paths.ResultDocx, buf);
        
      resolve({json, res});
      } catch (error) {
        reject(error);
      }
      
 });
}

function processData(json){
    doc.loadZip(zip);
    doc.setData(json);
    doc.render();
}

async function createPNG(){
  //imageMagick.convert()

   const { outputFiles, exitCode, stderr } = await executeAndReturnOutputFile({
    inputFiles:[await buildInputFile(`${Paths.PDFFile}`)],
    commands: [`convert -density 96 -depth 8 -quality 85 ${Paths.PNGFile}`]
  }, Paths.PNGFile);
//  if(exitCode !== 0) await loadImageElement(outputFiles[1], doc)
  if(exitCode)console.log(`There was an error while converting... ${stderr.join('\n')}`);
}


function executePowershell(req, res) {
  return new Promise((resolve, reject) => {
    let spawn = require("child_process").spawn, child;
      console.log("powershell start");
      console.log(Paths.PowershellScript);
    child = spawn("powershell.exe", [Paths.PowershellScript]);
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
