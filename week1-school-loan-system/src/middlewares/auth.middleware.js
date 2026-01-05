module.exports = (req,res,next)=>{

    const token = req.headers.authorization;
    
    if(!token){
        return res.status(401).json({message: "Unauthorized: No token provided"});
    }
    // In a real application, you would verify the token here
    if(token !== "valid-token"){
        return res.status(401).json({message: "Unauthorized: Invalid token"});
    }

    //mock
    req.user = { id: 1, name: "John Doe", role: "student" };
    next();

}