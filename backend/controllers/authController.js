import User from '../models/user.js'
import bcrypt from 'bcrypt'

const register = async (req,res)=>{
    const {name,username,email,password,role} = req.body;
    if(!name || !email || !password || !role){
        return res.status(400).json({message:'Please enter all fields'});
    }
    if(await User.findOne({email})){
        return res.status(400).json({message:'User already exists'});
    }
    const newUser = await User.create({
        name,
        email,
        role,
        password,
    });
    if(newUser){
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.role = user.role;
        res.json({redirectTo: `/${user.role}/dashboard`});
        
    }else{
        return res.status(400).json({message:'Registration failed'});
    }
}
const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({message:'Please enter all fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid email'});
        }
        if(!(user.password == password)){
            return res.status(401).json({message:`Invalid password`});
        }
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.role = user.role;
        res.json({redirectTo: `/${user.role}/dashboard`});
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const logout = (req,res)=>{
    res.send('Logout Route');
}
const me = (req,res)=>{
    res.send('Me Route');
}

export {register,login,logout,me};
