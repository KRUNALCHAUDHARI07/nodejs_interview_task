const userSchema = require("../model/USer.Model");
const jwt = require("jsonwebtoken");

module.exports = class User {
    async Register(req,res){
        try {
            const data = {
                name: req.body.name,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password
            };

            const userData = await userSchema.find({contact: data.contact});
            if(userData.length !== 0){
                return res.send({message:"user is already exists"});
            }
            const insertedUser = new userSchema(data);
            const user = await insertedUser.save();
            res.status(201).json({message:"user inserted",data: user});
        } catch (error) {
            res.status(400).json({message: "something went wrong"})
        }
    }

    async login(req,res){
        try {
            const data = {
                contact: req.body.contact,
                password: req.body.password
            };
            const userData = await userSchema.find(data);
            if(userData.length === 0){
                return res.status(400).json({message: "contact no and password is wrong"});
            }
            const tokenData = {
                id: userData[0]._id
            }
            const token = jwt.sign(tokenData,"secret");

            res.json({message:"login successfully", token:token});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "something went wrong"})
        }
    }

    async changePassword(req,res){
        try {
            const headers = req.headers.authorization;
            const tokenData = jwt.verify(headers,"secret");
            const userPassword = await userSchema.find({_id: tokenData.id});
            console.log(userPassword);
            const data = {
                oldpassword: req.body.oldpassword,
                newpassword: req.body.newpassword
            };

            if(userPassword[0].password !== data.oldpassword){
                return res.json({message: "old password is wrong"});
            }
            const changepassword = await userSchema.findByIdAndUpdate({_id:tokenData.id},{password: req.body.password});
            res.json({message: "password is changed"});
        } catch (error) {
            console.log(error);
            res.status(500).json({"message":"something went wrong"})
        }
    }
}