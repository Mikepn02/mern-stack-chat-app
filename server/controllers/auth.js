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
    
    const saveUser = await newUser.save()

    }catch(err) {

    }
}