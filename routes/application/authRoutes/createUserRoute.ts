// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionUser } from '../../../middlewares/middlewareSessionUser'

// Import models
import { UserModel } from "../../../models/userModel"


const createUserRoute = express()

// Route for the export
createUserRoute.post('/application/createUser', middlewareSyntax, middlewareSessionUser, (req, res) => {

    UserModel.find({ emailUser: req.body.email }, function (error, results) {
        if (error) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(500).json(
                {
                    error: true,
                    message: "Server Error"
                });
        }
        else {
            // Check if a user already use this email address
            if (results.length > 0) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(409).json(
                    {
                        error: true,
                        message: "Un utilisateur utilisant cette adresse mail est déjà enregistré"
                    });
            }
            else {
                let user = new UserModel({
                    emailUser: req.body.email,
                    passwordUser: req.body.password
                })
                // Hash the password
                const salt = bcrypt.genSaltSync(10)
                user.passwordUser = bcrypt.hashSync(user.passwordUser, salt)
                user.save()
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(201).json(
                    {
                        error: false,
                        message: "L'utilisateur a été créer avec succès"
                    });
            }
        }

    })

})


export { createUserRoute }
