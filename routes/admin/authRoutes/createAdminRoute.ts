// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { AdminModel } from "../../../models/adminModel"

//const createAdminRouteAdminModel= require("../../models/adminModel")



const createAdminRoute = express()

// Route for the export
createAdminRoute.post('/admin/createAdmin', middlewareSyntax, middlewareSessionAdmin, (req, res) => {

    AdminModel.find({ emailAdmin: req.body.email }, function (error, results) {
        if (error) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(500).json(
                {
                    error: true,
                    message: "Server Error"
                });
        }
        else {
            // Check if a admin already use this email address
            if (results.length > 0) {
                console.log(results)
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(409).json(
                    {
                        error: true,
                        message: "Un administrateur utilisant cette adresse mail est déjà enregistré"
                    });
            }
            else {
                let admin = new AdminModel({
                    emailAdmin: req.body.email,
                    passwordAdmin: req.body.password
                })
                // Hash the password
                const salt = bcrypt.genSaltSync(10)
                admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
                admin.save().then(() => {
                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                    res.status(201).json(
                        {
                            error: false,
                            message: "L'administrateur a été créer avec succès"
                        });
                })
            }
        }

    })

})


export { createAdminRoute }
