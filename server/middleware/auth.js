import jwt from 'jsonwebtoken';

export const verifyToken = async (req,res,next) => {
    try {
       let token = req.header("Authorization");

       if(!token) {
        return res.status(403).send("Access Denied , Please sign in or sign up to get the user");
       }
    //    that is sent from frontend
       if(token.startWith("Bearer ")){
        token = token.slice(7,tokens.length).trimLeft();
        // slice is used to get substring starting from index 7 and trim left method is then used to remove any leading whitespace characters that might be present after removing the prefix. 
       }
       // The "Bearer" scheme is used to identify the type of token being used for authentication.


       const verified = jwt.verify(token,process.env.JWT_SECRET);
       req.user = verified;
       next();
    }catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}
