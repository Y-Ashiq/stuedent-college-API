const fs = require("fs");
const departments = JSON.parse(fs.readFileSync("./department.json", "utf-8"));


const getAlldepartments = (res) => {

    console.log(departments);
    res.end("Data retrieved successfully");


};

const getDeparment = (req, res) => {
    req.on("data", chunk => {
        try {
            let data = JSON.parse(chunk).id;
            const department = departments.find(department => department.id === data);
            if (!department) {
                res.statusCode = 404;
                res.end("department not found");
            } else {
                console.log(department);
                res.end("department found");
            }
        } catch (error) {
            console.error("Error processing request:", error);
            res.statusCode = 400;
            res.end("Invalid request");
        }
    });

};




const postDepartment = (req, res) => {
    req.on("data", chunk => {
        departments.push(JSON.parse(chunk));
        fs.writeFileSync("./department.json", JSON.stringify(departments));
        res.end("department added");

    });


};




const deleteDepartment = (req, res) => {
    req.on("data", chunk => {
        let {
            id
        } = JSON.parse(chunk);
        let index = departments.findIndex(department => department.id === id);

        if(index != -1){
            departments.splice(index, 1);



        }else{
            console.log("department not found")
        }

        fs.writeFileSync("./department.json", JSON.stringify(departments));
        console.log(departments);
    });
    res.end("department deleted");

};


const putDepartment = (req, res) => {
    req.on("data", chunk => {
        let {
            id,
            name,
        } = JSON.parse(chunk);
        let data = departments.find(department => department.id === id);
        data.id = id;
        data.name = name;

        fs.writeFileSync("./department.json", JSON.stringify(departments));
    });
    res.end("department updated successfully");
};

module.exports = {getDeparment,getAlldepartments,postDepartment,putDepartment,deleteDepartment}