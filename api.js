var express = require('express');
var bp = require('body-parser')
var fs = require('fs')

var exp = express()
exp.use(bp.urlencoded({extended: true}))

var emp
fs.readFile("Employee.json", (err, data) => {
    emp = JSON.parse(data)
})

exp.get("/Employee", (req, res) => {
    return res.json(emp)
})

exp.get("/Employee/:id", (req, res) => {
    return res.json(emp.find( e => e.employeeid == req.params.id ) )
})

exp.put("/Employee/:id", (req, res) => {

    employeeid = req.body.employeeid
    name = req.body.name
    salary = req.body.salary
    department = req.body.department

    var index = emp.findIndex(e => e.employeeid == req.params.id)

    var emp1 = emp.find(e => e.employeeid == req.params.id)
    if(!emp1)
    {
        return res.json({success:false})
    }
    const updatedEmployee = {
        "employeeid": employeeid,
        "name": name,
        "salary": salary,
        "department": department
    }
    emp.splice(index, 1, updatedEmployee)

    fs.writeFile("Employee.json", JSON.stringify(emp), (err) => {
        return res.json(emp)
    })
})

exp.delete("/Employee/:id", (req, res) => {
    emp = emp.filter(e => e.employeeid != req.params.id)
    fs.writeFile("Employee.json", JSON.stringify(emp), (err) => {
        return res.json(emp)
    })
})

exp.listen(8080)