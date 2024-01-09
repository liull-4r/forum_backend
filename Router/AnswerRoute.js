const express = require("express")
const router = express.Router()
const {getanswer, postanswer} = require("../Controller/AnswerController")

const authmiddlware = require("../Middleware/authmiddleware")
router.get("/all-answers", authmiddlware, (req, res) => {
    res.send("all all answers")
})
router.post("/oneanswer", authmiddlware, postanswer)
router.get("/oneeanswer/:questionid",authmiddlware,getanswer)
module.exports=router