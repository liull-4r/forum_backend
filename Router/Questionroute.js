const express = require("express")
const router = express.Router()
// const postquestion = require("../Controller/QuestionController")
const { postquestion, getquestions }= require("../Controller/QuestionController")
const authmiddlware = require("../Middleware/authmiddleware")
router.get("/all-questions", authmiddlware, (req, res) => {
    res.send("all questions")
})
router.post("/onequestion", postquestion)
router.get("/allquestion",getquestions)
module.exports=router