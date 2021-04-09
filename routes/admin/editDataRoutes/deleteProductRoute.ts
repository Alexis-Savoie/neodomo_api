// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { ProductModel } from "../../../models/productModel"





const deleteProductRoute = express()

// Route for the export
deleteProductRoute.delete('/admin/deleteProduct', middlewareSyntax, middlewareSessionAdmin, (req, res) => {
    ProductModel.findOneAndDelete({ _id: req.body.idProduct }, null, function (err, results) {
        if (err) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(500).json(
                {
                    error: false,
                    message: "Server error"
                });
        }
        else {
            if (results == null) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(422).json(
                    {
                        error: false,
                        message: "Ce produit n'existe pas"
                    });
            }
            else {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                    {
                        error: false,
                        message: "Le produit à été supprimé avec succès."
                    });
            }
        }
    })
})


export { deleteProductRoute }
