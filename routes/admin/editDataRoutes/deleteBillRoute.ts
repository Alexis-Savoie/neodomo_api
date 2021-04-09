// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { BillModel } from "../../../models/billModel"





const deleteBillRoute = express()

// Route for the export
deleteBillRoute.delete('/admin/deleteBill', middlewareSyntax, middlewareSessionAdmin, (req, res) => {
    BillModel.findOneAndDelete({ _id: req.body.idBill }, null, function (err, results) {
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
                        message: "Cette facture n'existe pas"
                    });
            }
            else {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                    {
                        error: false,
                        message: "La facture à été supprimé avec succès."
                    });
            }
        }
    })
})


export { deleteBillRoute }
