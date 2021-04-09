// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { PostModel } from "../../../models/postModel"





const deletePostRoute = express()

// Route for the export
deletePostRoute.delete('/admin/deletePost', middlewareSyntax, middlewareSessionAdmin, (req, res) => {
    PostModel.findOneAndDelete({ _id: req.body.idPost }, null, function (err, results) {
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
                        message: "Ce post n'existe pas"
                    });
            }
            else {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                    {
                        error: false,
                        message: "Le post à été supprimé avec succès."
                    });
            }

        }

    })
})


export { deletePostRoute }
