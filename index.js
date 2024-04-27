const http = require("http");
const fs = require("fs");
const url = require("url");



const students = JSON.parse(fs.readFileSync("./student.json", "utf-8"));
const courses = fs.readFileSync("./courses.json", "utf-8");
const department = fs.readFileSync("./department.json", "utf-8");

// const student = students.find((el) => {
  
  
//   console.log(student);

// });



const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });




  if (req.url == "/students" && req.method == "GET") {

    res.end(JSON.stringify(students));

  } else if (req.url == "/students" && req.method == "POST") {

    req.on("data", chunk => {


      students.push(JSON.parse(chunk));
      console.log(students.includes(JSON.parse(chunk).name));
      fs.writeFileSync("./student.json", JSON.stringify(students));



    })
    res.end("user added");


  }



});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});