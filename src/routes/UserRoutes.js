const express = require('express');
const userRoutes = express.Router();

//
const {UserController}= require('../controllers');

//create 
userRoutes.post("/create",  UserController.createUser);

module.exports={userRoutes}