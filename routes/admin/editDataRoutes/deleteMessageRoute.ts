// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { MessageModel } from "../../../models/messageModel"





const deleteMessageRoute = express()

// Route for the export
deleteMessageRoute.delete('/admin/deleteMessage', middlewareSyntax, middlewareSessionAdmin, (req, res) => {
    MessageModel.findOneAndDelete({ _id: req.body.idMessage }, null, function (err, results) {
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
                        message: "Ce message privé n'existe pas"
                    });
            }
            else {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                    {
                        error: false,
                        message: "Le message privé à été supprimé avec succès."
                    });
            }
        }
    })
})


export { deleteMessageRoute }
