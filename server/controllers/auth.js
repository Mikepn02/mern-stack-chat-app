import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* Register user*/

export const register = async(req,res) => {
    try{
       const  {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
       } = req.body;

       const salt = await bcrypt.genSalt();
    //    we gonna use this salt to encrypt our password;
    const passwordHash = await bcrypt.hash(password,salt);

    // we gonna check if password is correct the we give json webtoken if password is true

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random()  * 1000),
        impressions:Math.floor(Math.random()  * 1000) 
    }) ;
    
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)

    }catch(err) {
       res.status(500).json({
        error: err.message
       });
    }
}

// LOGIN

export const login = async(req,res) =>  {
    try{

        const {email , password} = req.body;
        // we gonna find the email that much with the email entered by the use
        
        const user = await User.findOne({email : email});
        if(!user) return res.status(400).json({msg : "User does not exist"});

        // user.password this is the password saved in the database while logging in

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch)  return res.status(400).json({msg : "invalid credentials...."});

        const token = jwt.sign({id: user._id} ,process.env.JWT_SECRET);
        delete  user.password;
        // this is to make sure it can not be sent to the front-end

        res.status(200).json({ token ,user}); 

    }catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}