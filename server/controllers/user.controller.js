const express = require('express');
const router = express.Router();
const User = require('../models/user.model');


router.post("/signup", async (req, res)=> {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    };

    try{
        const user = await User.create(newUser);
        return res.status(201).json(user);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
})

router.post("/login", async (req, res) => {

    try{
        const { email, password } = req.body;

        const result  = await User.findOne({email});
        if(result)
        {
            if(result.password === password)
            {
                return res.status(200).json({
                    data: result,
                    message: "Log in Successful"
                });
            }
            else
            {
                return res.status(401).send({
                    message: "Invalid Password"
                })
            }
        }
        else
        {
            res.status(404).send({
                message: "Invalid Email"
            })
        }
        
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message});
    } 
  });

  module.exports = router;