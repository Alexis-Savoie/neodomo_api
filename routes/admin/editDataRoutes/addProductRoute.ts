// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { ProductModel } from "../../../models/productModel"





const addProductRoute = express()

// Route for the export
addProductRoute.post('/admin/addProduct', middlewareSyntax, middlewareSessionAdmin, (req, res) => {
    if (req.body.nameProduct == undefined || req.body.description == undefined || req.body.price == undefined || req.body.availableStock == undefined || req.body.imageURL == undefined) {
        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
        res.status(403).json(
            {
                error: false,
                message: "Une ou plusieurs données est invalide"
            });
    }

    else {
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
    }
})

export { addProductRoute }
