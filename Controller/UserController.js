const connection = require("../DatabaseConnection/Config")
const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken") 
const register = async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body
    if (!username || !firstname || !lastname || !email || !password) {
       return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }
    try {
        const [user] = await connection.query("select username,userid from users where username=? or email=?", [username, email])
        // console.log(user)
        if (user.length > 0) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "user already registered" })
        }
        if (password.length <= 8) {
           return res.status(StatusCodes.BAD_REQUEST).json({ message: "password should be greater than 8" })
        }      
        const hashedPassword = await bcrypt.hash(password, 10)
        await connection.query("insert into users (username,firstname,lastname,email,password) values(?,?,?,?,?)", [username, firstname, lastname, email, hashedPassword])
       return res.status(StatusCodes.CREATED).json({ message: "All datas are successfully registersd" })
    
} catch (error) {
    // console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "something went wrong try again later" })
}

}
const login= async (req, res) => {
    const {email,password} = req.body
    
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({message:"all fields are required"})
    }
    try {
        const [user] = await connection.query("select username,userid,password from users where email=?", [email])

        if (user.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "invalid credintial" }) 
        }
        const isMatch = await bcrypt.compare(password, user[0].password)

        if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({message:"invalid credintial"})
        }
        // return res.status(StatusCodes.OK).send("login successfully")
        const username = user[0].username
        const userid = user[0].userid
        const token = jwt.sign({ username, userid},  process.env.JWT_Token, { expiresIn: "30min" })
       return res.status(StatusCodes.OK).json({ message: "login successfully", token: token,username:username });

        
    } catch (error) {
    // console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong try again later"})
    }
}
const checkUser = (req, res) => {
    const username = req.user.username
    const userid = req.user.userid
    return res.status(StatusCodes.OK).json({msg:"user name and user id",username:username,userid:userid})
}

module.exports = {register, login, checkUser}