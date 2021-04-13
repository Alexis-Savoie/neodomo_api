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



const changePasswordAdminRoute = express()

// Route for the export
changePasswordAdminRoute.put('/admin/changePassword', middlewareSyntax, middlewareSessionAdmin, (req, res) => {

    AdminModel.find({ emailAdmin: req.body.emailToken }, function (error, results) {
        // mongodb error case
        if (error) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(500).json(
                {
                    error: true,
                    message: "Server Error"
                });
        }


        else {
            // Check if the original password is correct
            bcrypt.compare(req.body.password, results[0].passwordAdmin).then(isOk => {
                if (isOk) {
                    if (req.body.newPassword != null || req.body.newPassword == "") {
                        const hashPassword = async () => {
                            // Update password using a async function, due to bcrypt operation
                            req.body.newPassword = await new Promise(resolve => {
                                bcrypt.genSalt(10, async (err, salt) => {
                                    return await bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                                        resolve(hash)
                                    })
                                })
                            })
                            // once the password is hashed we save it in the DB

                            AdminModel.findOneAndUpdate({ _id: results[0]._id }, { passwordAdmin: req.body.newPassword }, { upsert: true }, function (error, results) {
                                // mongodb error case
                                if (error) {
                                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                                    res.status(500).json(
                                        {
                                            error: true,
                                            message: "Server Error"
                                        });
                                }
                                else {
                                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                                    res.status(201).json(
                                        {
                                            error: false,
                                            message: "Mot de passe administrateur modifié"
                                        });
                                }
                                //if (error) console.log(error)
                            })
                        }
                        hashPassword()
                    } else {
                        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                        res.status(403).json(
                            {
                                error: false,
                                message: "Une ou plusieurs données est invalide"
                            });
                    }
                } else {
                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                    res.status(403).json(
                        {
                            error: false,
                            message: "Ancien mot de passe incorrect"
                        });
                }
            })
        }
    })
})

export { changePasswordAdminRoute }
