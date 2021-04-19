// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { ProductModel } from "../../../models/productModel"





const editProductRoute = express()

// Route for the export
editProductRoute.put('/admin/editProduct', middlewareSyntax, middlewareSessionAdmin, (req, res) => {

    let productUpdate: any = {}

    if (req.body.nameProduct != undefined && req.body.nameProduct != "")
        productUpdate.nameProduct = req.body.nameProduct
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.description != undefined && req.body.description != "")
        productUpdate.description = req.body.description
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.price != undefined && req.body.price != "")
        productUpdate.price = req.body.price
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.availableStock != undefined && req.body.availableStock != "")
        productUpdate.availableStock = req.body.availableStock
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.imageURL != undefined && req.body.imageURL != "")
        productUpdate.imageURL = req.body.imageURL


    ProductModel.findOneAndUpdate({ _id: req.body.idProduct }, productUpdate, null, function (error, results) {
        if (error) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(500).json(
                {
                    error: true,
                    message: "Server Error"
                });
        }
        else {
            if (results == null) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(422).json(
                    {
                        error: true,
                        message: "Ce produit n'existe pas"
                    });
            }
            else {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                {
                    error: false,
                    message: "Le produit à été modifié avec succès."
                });
            }
        }
    })
})


export { editProductRoute }
