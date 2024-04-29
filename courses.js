const fs = require("fs");

const courses = JSON.parse(fs.readFileSync("./courses.json", "utf-8"));
const students = JSON.parse(fs.readFileSync("./student.json", "utf-8"));


const getAllCourses = (res) => {

    console.log(courses);
    res.end("Data retrieved successfully");


};


const getCourse = (req, res) => {
    req.on("data", chunk => {
        try {
            let data = JSON.parse(chunk).id;
            const course = students.find(course => course.id === data);
            if (!course) {
                res.statusCode = 404;
                res.end("Student not found");
            } else {
                console.log(course);
                res.end("Student found");
            }
        } catch (error) {
            console.error("Error processing request:", error);
            res.statusCode = 400;
            res.end("Invalid request");
        }
    });

};

const postCourse = (req, res) => {
    req.on("data", chunk => {

        courses.push(JSON.parse(chunk));
        fs.writeFileSync("./courses.json", JSON.stringify(courses));
        res.end("course added");

    });


};
const deleteCourse = (req, res) => {
    req.on("data", chunk => {
        let {
            id
        } = JSON.parse(chunk);
        let index = courses.findIndex(course => course.id === id);
        if(index != -1){
            courses.splice(index, 1);

        }else {
            console.log("student not found");
        }
        fs.writeFileSync("./courses.json", JSON.stringify(courses));
        console.log(courses);
    });
    res.end("course deleted");

};
const putCourse = (req, res) => {
    req.on("data", chunk => {
        let {
            id,
            name,
            content,
            departmentID
        } = JSON.parse(chunk);
        let data = courses.find(course => course.id === id);
        data.id = id;
        data.name = name;
        data.content = content;
        data.departmentID = departmentID;
        fs.writeFileSync("./courses.json", JSON.stringify(courses));
    });
    res.end("course updated successfully");
};

module.exports = {getAllCourses , getCourse ,  putCourse , deleteCourse ,postCourse}