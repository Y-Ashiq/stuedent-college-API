const http = require("http");
const courses = require("./courses");
const students = require("./students");
const departments = require("./departments")



const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    switch (req.url) {
        case "/students":
            if (req.method === "GET") {
                students.getStudents(res);
            } else if (req.method === "POST") {
                students.postStudent(req, res);
            } else if (req.method === "DELETE") {
                students.deleteStudent(req, res);
            } else if (req.method === "PUT") {
                students.putStudent(req, res);
            }
            break;
        case "/students/all-students":
            if (req.method === "GET") {
                students.getAllStudents(res);
            }
            break;
        case "/student":
            if (req.method === "GET") {
                students.getStudent(req, res);
            }
            break;
        case "/courses":
            if (req.method === "POST") {
                courses.postCourse(req, res);
            } else if (req.method === "PUT") {
                courses.putCourse(req, res);
            } else if (req.method === "DELETE") {

                courses.deleteCourse(req, res);
            } else if (req.method === "GET") {
                courses.getAllCourses(res);
            }
            break;
        case "/course":
            if (req.method === "GET") {
                courses.getCourse(req, res);
            }
            break;
        case "/departments":
            if (req.method === "POST") {
                departments.postDepartment(req, res);
            } else if (req.method === "PUT") {
                departments.putDepartment(req, res);
            } else if (req.method === "DELETE") {
                departments.deleteDepartment(req, res);

            } else if (req.method === "GET") {
                departments.getAlldepartments(res);
            }
            break;
        case "/department":
            if (req.method === "GET") {
                departments.getDeparment(req, res);
            }
            break;
        default:
            res.end("Invalid endpoint");
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});