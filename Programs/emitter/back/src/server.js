const http = require("http");
const dbEvents = require("./common/dbEvents.js");

const pid = process.pid;
const PORT = 8800;
let subscribers =[];
http
  .createServer((req, res) => {
    const obj = dbEvents.read("003");

    const { headers, method, url } = req;
    let body = [];
    req
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        if(headers.type='subscribeEvents')
        body.push(uuid);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,OPTIONS,POST,PUT"
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(body);
      });
  })
  .listen(PORT, () => console.log(`Server started PORT: ${PORT} PID: ${pid}`));
