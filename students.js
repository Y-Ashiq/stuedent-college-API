const fs = require("fs");
const students = JSON.parse(fs.readFileSync("./student.json", "utf-8"));
const newArray = JSON.parse(JSON.stringify(students));
const departments = JSON.parse(fs.readFileSync("./department.json", "utf-8"));
const courses = JSON.parse(fs.readFileSync("./courses.json", "utf-8"));



const checkEmail = (email) => {
    return students.some(el => el.email === email);
};

const getStudents = (res) => {
    console.log(students);
    res.end("Data retrieved successfully");
};


const getAllStudents = (res) => {
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < departments.length; j++) {
            if (newArray[i].departmentID == departments[j].id) {
                newArray[i].departmentInfo = departments[j];
                newArray[i].coursesInfo = courses[j];
            };

        }
    }
    console.log(newArray);
    res.end("Data retrieved successfully");
};

const getStudent = (req, res) => {
    req.on("data", chunk => {
        try {
            let data = JSON.parse(chunk).id;
            const student = students.find(student => student.id === data);
            if (!student) {
                res.statusCode = 404;
                res.end("Student not found");
            } else {
                console.log(student);
                res.end("Student found");
            }
        } catch (error) {
            console.error("Error processing request:", error);
            res.statusCode = 400;
            res.end("Invalid request");
        }
    });


};

const postStudent = (req, res) => {
    req.on("data", chunk => {
        let data = JSON.parse(chunk);
        let email = data.email;

        if (checkEmail(email)) {
            res.end("Sorry, this email already exists");
        } else {
            students.push(data);
            fs.writeFileSync("./student.json", JSON.stringify(students));
            res.end("User added");
        }
    });
};

const deleteStudent = (req, res) => {
    req.on("data", chunk => {
        let {
            id
        } = JSON.parse(chunk);
        let index = students.findIndex(student => student.id === id);

        if(index != -1){
            students.splice(index, 1);

        }else {
            console.log("student not found");
        }
        fs.writeFileSync("./student.json", JSON.stringify(students));
        console.log(students);
    });
    res.end("User deleted");
};
const putStudent = (req, res) => {
    req.on("data", chunk => {
        let {
            id,
            name,
            email,
            password,
            departmentID
        } = JSON.parse(chunk);
        let data = students.find(student => student.id === id);
        data.id = id;
        data.name = name;
        if (checkEmail(email)) {
            res.end("sorry this email is already exist")
        } else {
            data.email = email;
        }
        data.password = password;
        data.departmentID = departmentID;
        fs.writeFileSync("./student.json", JSON.stringify(students));
    });
    res.end("Student updated successfully");
};

module.exports = {getStudent, getAllStudents,getStudents,putStudent,deleteStudent , postStudent}