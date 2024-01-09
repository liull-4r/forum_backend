const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
app.use(express.json());
app.use(cors())
require('dotenv').config();
const connection = require('./DatabaseConnection/Config')
const userRoute = require('./Router/userRoute')
const questionroute = require('./Router/Questionroute')
const answerroute = require('./Router/AnswerRoute')
const authmiddlware = require('./Middleware/authmiddleware');
app.use(express.urlencoded({ extended: true }));
async function start() {
  try {
    const result = await connection.execute("select 'teat' ")
    console.log(`listening on port ${port}`)
    console.log("database connected success fully")
    // console.log(result)
  
} catch (error) {
  console.log(error.message)
  
  }
  
} 
  start()
app.use('/api/users', userRoute)
app.use('/api/question',authmiddlware, questionroute)
app.use('/api/answer', answerroute)
app.get("/", (req, res) => {
res.send("Hello World!")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


