const http = require("http");
const fs = require("fs");
const url = require("url");


const students = JSON.parse(fs.readFileSync("./student.json", "utf-8"));
const courses = fs.readFileSync("./courses.json", "utf-8");
const department = fs.readFileSync("./department.json", "utf-8");
console.log(students[0]);


const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });




  if (req.url == "/students" && req.method == "GET") {

    res.end(JSON.stringify(students));




  }



});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});