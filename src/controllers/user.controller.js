const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "key";
let loggedInUserId = null;

const signup = async (req,res) =>{
    
    const {username, email, password } = req.body;
    try {
        //Existing User Check
        const existingUser = await userModel.findOne({ email : email });
        if (existingUser) {
            return res.status(400).json({message:"User alredy exists."}) 
        }

        //Hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //User Creaction
        const userCreate = await userModel.create({
            email : email,
            password : hashedPassword,
            username : username,
        })

        // JWT token
        const token = jwt.sign({ email: userCreate.email, id: userCreate.id }, SECRET_KEY);

        // Reset loggedInUserId to null after successful signup    
        loggedInUserId = null;

        res.status(201).json({ message: "User signup successful.", token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong with signup."})
    }

};

const signin = async (req,res) =>{
    const {email, password} = req.body;

    try {
        
        const existingUser = await userModel.findOne({ email : email });

        if (loggedInUserId) {
            return res.status(200).json({ message: "User is already logged in." });
        }

        if (!existingUser) {
            return res.status(404).json({message:"User not Found."}) 
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({message:"Invalid Credentails."})
        }
        else{
            const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY);
            loggedInUserId = existingUser._id;
            return res.status(200).json({ message: "Login successful", token: token });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong with signin."})
    }

};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({ users: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting users from the database." });
    }
};

module.exports = {signin,signup,getAllUsers};