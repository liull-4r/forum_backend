const connection = require("../DatabaseConnection/Config")
const { StatusCodes } = require("http-status-codes")
const Middleware = require("../Middleware/authmiddleware")
const { v4: uuidv4 } = require('uuid');
  
// console.log(uniqueId);

const postquestion = async (req, res) => {
     const uniqueId = uuidv4();
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "all fields are required" });
    }
    // console.log(req.user)

    const userid = req.user.userid; 

    try { 
        await connection.query("INSERT INTO questions (title,  description, userid,questionid) VALUES (?, ?, ?, ?)", [title, description, userid,uniqueId]);
        return res.status(StatusCodes.CREATED).json({message: "question posted successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong try again later when you ask",error});
    }
};
const getquestions = async (req, res) => {

    try {
        const [questions] = await connection.query(  "SELECT * FROM questions JOIN users ON questions.userid = users.userid ");
        return res.status(StatusCodes.OK).json({ questions });

    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong try again later"});
    }
}

module.exports = { postquestion, getquestions };




