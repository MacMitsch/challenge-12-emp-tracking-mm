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

connection.query = util.promisify(connection.query);

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
                viewDepartments();
                break;

            case "View Role":
                viewRole();
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
        };

    }).catch((err) => {
        if (err) throw err;
    });
}

// Selection View All Employees
const viewAllEmployees = async () => {
    console.log('View All Employees');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err,res){
            if (err) throw err;
            let employeesArray = [];
            res.forEach(employee => employeesArray.push(employee));
            console.table(employeesArray);
            initialAction();
        });
    } catch (err) {
        console.log(err, "At View All Employees");
        initialAction();
    };
}

// Selection View All Departments
const viewDepartments = async () => {
    console.log('View All Departments');
    try {
        let query = 'SELECT * FROM departments';
        connection.query(query,function(err,res){
            if (err) throw err;
            let departmentsArray = [];
            res.forEach(department => departmentsArray.push(department));
            console.table(departmentsArray);
            initialAction();
        });
    } catch (err) {
        console.log(err,"At View All Departments");
        initialAction();
    };
}

// Selection Get Role
const getRole = async () => {
    console.log('Get Employee Roles');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query,function(err,res){
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            initialAction();
        });
    } catch (err) {
        console.log(err,'At Get Role');
        initialAction();
    };
}

// Selection Add New Employees
const addNewEmployee = async () => {
    try {
    console.log('Add New Employee');
    let roles = connection.query('SELECT * FROM role');
    let managers = connection.query('SELECT * FROM employee');
    let answer = await inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Please enter the First Name'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Please enter the Last Name'
        },
        {
            name: 'employeeRoleId',
            type: 'list',
            choices: roles.maps((role) => {
                return {
                   name: role.title,
                   value:role.id
                }
            }),
            message: 'Please Enter Employee Id.'
        },
        {
            name: 'employeeManagerId',
            type: 'list',
            choices: roles.maps((manager) => {
                return {
                    name:manager.first_name + " " + manager.last_name,
                    value: manager.id
                }
            }),
            message: "What is the new employees managers Id?"
        }
    ])

// Result shown and posted to employee table
    let result = connection.query('INSERT INTO employee set', {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.updateEmployeeRole,
        manager_id: (answer.employeeManagerId)
    });
// Result posted to table or give error
    console.log(`${answer.firstName} ${answer.lastName} successfully added`);
    initialAction();
    } catch (err) {
        console.log(err, 'with try employee add')
        initialAction();
    }

}