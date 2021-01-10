
var express = require('express')
const router = express.Router();
const Questions = require('../controller/questions.controller')
const Answers = require('../controller/answers.controller') 
const Votes = require('../controller/votes.controller');

//---------------------- QUESTIONS --------------------------//

router.get("/", Questions.getAllQuestions)
router.get("/hotquestions", Questions.getHotQuestions)
router.post("/", Questions.postAQuestion)
router.get("/:qID", Questions.getAQuestion)
router.put("/:qID", Questions.editAQuestion)
router.delete("/:qID", Questions.deleteAQuestion)

//-------------------------- ANSWERS ---------------------------//

router.post('/:qID/answer', Answers.postAnAnswer)
router.put('/:qID/answer/:aID', Answers.editAnAnswer)
router.delete('/:qID/answer/:aID', Answers.deleteAnAnswer)

//-------------------------- QUESTION & ANSWER VOTE ---------------------------------//

router.put('/:qID/voteup', Votes.voteUpAQuestion)
router.put('/:qID/votedown', Votes.voteDownAQuestion)

router.put('/:qID/answer/:aID/voteup', Votes.voteUpAnAnswer)
router.put('/:qID/answer/:aID/votedown', Votes.voteDownAnAnswer)

module.exports = router;