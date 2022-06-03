const fs = require('fs')
const path = require('path');


//Students data models

const students = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/db.json')).toString())

// get latest id
const getLatestId = () => {

    if(students.length > 0){
        return students[students.length - 1].id + 1
    }else{
        return 1;
    }
}


// get all students
const getAllStudents = (req, res) => {
   if(students.length > 0){
    res.status(200).json(students)
   }else{
       res.status(404).json({
           Message: 'Data Not Found'
       })
   }
}

 // get single student
 const getSingleStudent = (req, res) => {
     
    let id = req.params.id;

    if(students.some(data => data.id == id)){
        res.status(200).json(students.find(data => data.id == id));
    }else{
        res.status(404).json({
            Message: 'Data Not Found'
        })
    }
    
 }

 // add another students
 const createstudents = (req, res) => {
    
   if(req.body.name != '' && req.body.skill != '' && req.body.age != ''){
    students.push({
        id : getLatestId(),
        name : req.body.name,
        skill : req.body.skill,
        age : req.body.age
    })
   
    fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(students))
   
    res.status(200).json({
        Message: 'Student data Submit Successfull'
    })
   }else{
    res.status(400).json({
        Message: 'All Field Are Required'
    })
   }

}

// edit students
const updateStudents = (req, res) => {
    res.send(`Put Route Done with id ${req.params.id}`)
}

// delete students 
const deleteStudents = (req, res) => {
    let id = req.params.id;
   let updateData = students.filter(data => data.id != id)

    if(students.some(data => data.id == id)){
        fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(updateData))
        res.status(202).json({
            Message : "Data Deleted"
        })
    }else{
        res.status(400).json({
            Message : 'Data Not Found'
        })
    }
   
}

module.exports = {
    getAllStudents,
    getSingleStudent,
    createstudents,
    updateStudents,
    deleteStudents
}