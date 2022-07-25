const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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
    welcomePrompt();
});

function welcomePrompt() {
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
        switch (res.selection) {

            case "View All Employees":
                viewAllEmployees();
                break;

            case "View Employees By Departments":
                viewEmployeeByDepartments();
                break;

            case "Add New Employee":
                addNewEmployee();
                break;

            case "Remove Old Employee":
                removeOldEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Create New Role":
                createNewRole();
                break;

            case "Create New Department":
                createNewDepartment();
                break;

            case "Leave":
                connection.end();
                break;
        }

    }).catch((err) => {
        if (err) throw err;
    });
}