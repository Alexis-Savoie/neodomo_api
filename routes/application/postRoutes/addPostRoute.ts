
// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionUser } from '../../../middlewares/middlewareSessionUser'

// Import models
import { PostModel } from "../../../models/postModel"



const addPostRoute = express()

// Route for the export
addPostRoute.post('/application/addPost', middlewareSyntax, middlewareSessionUser, (req, res) => {
    let post = new PostModel({
        emailPublisher: req.body.emailPublisher,
        textContent: req.body.textContent,
        listImage: req.body.listImage,
        listLike: req.body.listLike,
        listComment: req.body.listComment,
        listReport: req.body.listReport
    })

    post.save().then(() => {
        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
        res.status(201).json(
            {
                error: false,
                message: "Le nouveau post a été ajouté avec succès."
            });
    })
})


export { addPostRoute }
