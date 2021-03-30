// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'

// Import models
import { AdminModel } from "../../../models/adminModel"


// Import env variables
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
let JWT_TOKEN_SECRET: string = process.env.JWT_TOKEN_SECRET!


const authAdminRoute = express()


// Route for the export
authAdminRoute.post('/admin/login', middlewareSyntax, (req, res) => {
    // check if an user is registered with this username
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
            // mongoDB error case
            if (error) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(500).json(
                    {
                        error: true,
                        message: "Server Error"
                    });
            }
            // if incorrect creditentials
            else if (results.length == 0) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(400).json(
                    {
                        error: true,
                        message: "Identifiants incorrect"
                    });
            }

            // if it's a existing username then check password 
            else {
                // Check cooldown date

                let d = Date.now()
                if (results[0].dateBlockCooldownAdmin < d) {
                    bcrypt.compare(req.body.password, results[0].passwordAdmin).then(isOk => {
                        if (isOk) {
                            //Version that never expire
                            var token = jwt.sign(req.body.email, JWT_TOKEN_SECRET, { algorithm: "HS256" })

                            let email = results[0].emailAdmin;
                            AdminModel.findOneAndUpdate({ _id: results[0]._id }, { tokenAdmin: token, nbLoginTryAdmin: 0 }, { upsert: true }, function (error, results2) {
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
                                    res.status(200).json(
                                        {
                                            error: false,
                                            message: "L'administrateur a été authentifié avec succès",
                                            token: token
                                        });
                                }
                            });
                        } else {
                            //#region temporary password stuff
                            //console.log(results[0].temporaryPasswordAdmin)
                            bcrypt.compare(req.body.password, results[0].temporaryPasswordAdmin).then(isOk => {
                                if (isOk) {
                                    //Version that never expire
                                    var token = jwt.sign(req.body.email, JWT_TOKEN_SECRET, { algorithm: "HS256" })

                                    let email = results[0].emailAdmin;
                                    let _id = results[0]._id;

                                    // Login user and replace his old password by the generated one
                                    const salt = bcrypt.genSaltSync(10)
                                    AdminModel.findOneAndUpdate({ _id: _id }, { passwordAdmin: bcrypt.hashSync(req.body.password, salt), tokenAdmin: token, temporaryPasswordAdmin: "", nbLoginTryAdmin: 0 }, { upsert: true }, function (error, results3) {
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
                                            res.status(200).json(
                                                {
                                                    error: false,
                                                    message: "L'administrateur a été authentifié avec succès (Mot de passe temporaire)",
                                                    token: token
                                                });
                                        }
                                    });

                                }
                                //#endregion
                                else {
                                    // Check number of tries and add one or change cooldown
                                    if (results[0].nbLoginTryAdmin >= 2) {
                                        var oldDateObj = new Date();
                                        var newDateObj = new Date();
                                        newDateObj.setTime(oldDateObj.getTime() + (5 * 60 * 1000));
                                        AdminModel.findOneAndUpdate({ _id: results[0]._id }, { dateBlockCooldownAdmin: newDateObj, nbLoginTryAdmin: 0 }, { upsert: true }, function (error, results4) {
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
                                                res.status(400).json(
                                                    {
                                                        error: true,
                                                        message: "Trop de tentatives réessayer plus tard."
                                                    });

                                            }
                                        });
                                    } else {
                                        AdminModel.findOneAndUpdate({ _id: results[0]._id }, { nbLoginTryAdmin: (results[0].nbLoginTryAdmin + 1) }, { upsert: true }, function (error, results5) {
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
                                                res.status(400).json(
                                                    {
                                                        error: true,
                                                        message: "Identifiants incorrect"
                                                    });
                                            }
                                        });
                                    }
                                }
                            })
                        }
                    });
                } else {
                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                    res.status(400).json(
                        {
                            error: true,
                            message: "Trop de tentatives réessayer plus tard."
                        });
                }
            }
        }
    });
})


export { authAdminRoute }
