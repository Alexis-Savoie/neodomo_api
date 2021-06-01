// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionUser } from '../../../middlewares/middlewareSessionUser'

// Import models
import { CommentModel } from "../../../models/commentModel"





const addCommentRoute = express()

// Route for the export
addCommentRoute.post('/application/addComment', middlewareSyntax, middlewareSessionUser, (req, res) => {
    let comment = new CommentModel({
        idPost: req.body.idPost,
        emailSender: req.body.emailSender,
        textContent: req.body.textContent,
        replyTo: req.body.replyTo,
        listReport: req.body.listReport
    })

    comment.save().then(() => {
        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
        res.status(201).json(
            {
                error: false,
                message: "Le nouveau commentaire à été ajouté avec succès."
            });
    })
})


export { addCommentRoute }
