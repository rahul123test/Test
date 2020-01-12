// business.route.js

const express = require('express');
const app = express();
const empRoutes = express.Router();

// Require Business model in our routes module
let Emp = require('../models/emp');

// Defined store route
empRoutes.route('/addEmp').post(function (req, res) {
  let emp = new Emp(req.body);
  emp.save()
    .then(emp => {
      res.status(200).json({'emp': 'employee in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
empRoutes.route('/allData').get(function (req, res) {
  Emp.find(function (err, emp){
    if(err){
      console.log(err);
    }
    else {
      res.json(emp);
    }
  });
});

// Defined edit route
empRoutes.route('/empRecord/:id').get(function (req, res) {
  let id = req.params.id;
  Emp.find({"eid":id}, function (err, emp){
    if(err){
      console.log(err);
    }
    else {
      res.json(emp);
    }
  });
});

//  Defined update route
empRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  Emp.find({"eid":id}, function(err, emp) {
    if (!emp)
      return res.json('Record Not Found');
    else {

      Emp.updateOne({"eid":id},{$set:req.body}).then(empl =>{
        res.json("Employee Data Updated");
      }).catch( err =>{
        res.json("Record Not Updated");
      });

    }
  });
});

// Defined delete | remove | destroy route
empRoutes.route('/delete/:id').get(function (req, res) {
  Emp.deleteOne({"eid": req.params.id}, function(err, emp){
    if(err) res.json(err);
    else res.json('Employee Removed Successfully');
  });
});

module.exports = empRoutes;