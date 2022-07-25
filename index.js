const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306"
    user: "user",
    password: "",
    database: "employee_DB"
})

connectionl.connect(function (err) {
    if (err) throw err;
    //   After connection is established run first Function
    firstPrompt();
});

function firstPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please select what you would like to do',
            choices: [
                "View All Employees",
                "View Employees By Departments",
                "Add New Employee",
                "Remove Old Employee",
                "Update Employee Role",
                "Create new Role",
                "Create new Department",
                "Leave"
            ]
        }
    ]).then((res) => {
        console.log(res.selection);
        case "View All Employees";
        viewAllEmployees();
        break;
        case "View Employees By Departments";
        viewEmployeeByDepartments();
        break;
    })
}
