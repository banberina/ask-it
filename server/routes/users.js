const express = require("express")
const router = express.Router()
const Users = require("../controller/users.controller")

router.get("/mostactive", Users.getUsersWithMostComments) 
router.get("/:uID", Users.getAUser) 
router.put("/modifyname/:uID", Users.editAUserName) 
router.put("/modifysurname/:uID", Users.editAUserSurname) 
router.put("/modifyemail/:uID", Users.editAUserEmail) 
router.put("/modifypassword/:uID", Users.editAUserPassword) 

module.exports = router