const express = require("express")
const router = express.Router()
const Users = require("../controller/users.controller")
const User = require("../models/user.model")

router.get("/mostactive", Users.getUsersWithMostComments) 
router.get("/:uID", Users.getAUser) 
router.get("/:uID/myquestions", Users.getMyQuestions)
router.put("/modifyname/:uID", Users.editAUserName) 
router.put("/modifysurname/:uID", Users.editAUserSurname) 
router.put("/modifyemail/:uID", Users.editAUserEmail) 
router.put("/modifypassword/:uID", Users.editAUserPassword) 

module.exports = router