const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
async function authmiddlware(req, res, next) {
    const autheader = req.headers.authorization
    if(!autheader) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized request")
    }
    const token = autheader.split(' ')[1]
    // console.log(autheader)
    // console.log(token)
    try {
        const { username, userid } = jwt.verify(token, process.env.JWT_Token)
        req.user = {username,userid}
        next()
    } catch (error) {
         return res.status(StatusCodes.UNAUTHORIZED).send("something went wrong")
        
    }
}
module.exports=authmiddlware