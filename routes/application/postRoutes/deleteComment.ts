// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionUser } from '../../../middlewares/middlewareSessionUser'

// Import models
import { CommentModel } from "../../../models/commentModel"





const deleteCommentRoute = express()

// Route for the export
deleteCommentRoute.delete('/application/deleteComment', middlewareSyntax, middlewareSessionUser, (req, res) => {
    CommentModel.findOneAndDelete({ _id: req.body.idComment }, null, function (err, results) {
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
                        message: "Ce commentaire n'existe pas"
                    });
            }
            else {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                    {
                        error: false,
                        message: "Le commentaire à été supprimé avec succès."
                    });
            }
        }
    })
})


export { deleteCommentRoute }