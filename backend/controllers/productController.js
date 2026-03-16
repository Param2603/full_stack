import Product from "../models/productModel";
import cloudinary from "../utils/cloudinary";
import getDataUri from "../utils/dataUri";

export const addProduct = async(req,res) => {
    try {
        const {productName, productDesc, productPrice, category, brand} = req.body;
        const userId = req.id;

        if(!productName || !productDesc || !productPrice || !category || !brand){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        // it can handle multiple image can upload
        let productImg = []
        if(req.files && req.files.length > 0){
            for(let file of req.files){
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri, {
                    folder: "mern_products" // cloudinary folder namme
                })

                productImg.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
            }
        }

        //create a product in a DB
        const newProduct = await Product.create({
            userId,
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            productImg
        })

        return res.status(200).json({
            success: true,
            message: "Product added Successfully",
            product:newProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })   
    }
}

export const getAllProduct = async(_, res) => {
    try {
        const products = await Product.find()
        if(!products){
            return res.status(404).json({
                success: false,
                message: "No Product Available",
                products: []
            })
        }
        return res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })      
    }
}