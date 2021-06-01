// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionUser } from '../../../middlewares/middlewareSessionUser'

// Import models
import { ProductModel } from "../../../models/productModel"





const addProductRoute = express()

// Route for the export
addProductRoute.post('/application/addProduct', middlewareSyntax, middlewareSessionUser, (req, res) => {
    let product = new ProductModel({
        nameProduct: req.body.nameProduct,
        description: req.body.description,
        price: req.body.price,
        availableStock: req.body.availableStock,
        imageURL: req.body.imageURL
    })

    product.save().then(() => {
        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
        res.status(201).json(
            {
                error: false,
                message: "Le nouveau produit à été ajouté avec succès."
            });
    })
})


export { addProductRoute }
