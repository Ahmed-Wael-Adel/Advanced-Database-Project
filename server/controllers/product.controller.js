const express = require('express');
const router = express.Router();
const Product = require("../models/product.model");


router.post("/add", async(req, res) => {
    try{
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price
        }

        const result = await Product.create(newProduct);
        return res.status(201).send({
            message: "Product Added"
        })
    }
    catch(error){
        res.status(500).send({
            message: error.message
        })
    }
})

router.get("/", async(req, res) => {
    try{
        const products = await Product.find({})
        return res.status(200).json({
            products: products
        })
    }
    catch(error){
        res.status(500).send({
            message: error.message
        })
    }
    
})

router.get("/category", async(req, res) => {
    try{
        const category = req.query.category
        const products = await Product.find({category: category})
        return res.status(200).json({
            data: products
        })
    }
    catch(error){
        res.status(500).send({
            message: error.message
        })
    }
    
})

router.put("/update/:id", async(req, res) => {
    const {id} = req.params;
    const {name, description, category, price} = req.body
    try{
        const result = await Product.findByIdAndUpdate(id, {name, description, category, price}, { new: true })
        if(result)
        {
            res.status(200).send({
                message: "Updated Successfuly"
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message
        })
    }
    
})

router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const response = await Product.findByIdAndDelete(id)
        if(response)
        {
            return res.status(204).send({
                message: "Product Deleted"
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message
        })
    }
})


module.exports = router;