// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'

// Import models
import { UserModel } from "../../../models/userModel"


// Import env variables
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
let JWT_TOKEN_SECRET_USER: string = process.env.JWT_TOKEN_SECRET_USER!


const authAppRoute = express()


// Route for the export
authAppRoute.post('/application/login', middlewareSyntax, (req, res) => {
    // check if an user is registered with this username
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
                if (results[0].dateBlockCooldownUser < d) {
                    bcrypt.compare(req.body.password, results[0].passwordUser).then(isOk => {
                        if (isOk) {
                            //Version that never expire
                            var token = jwt.sign(req.body.email, JWT_TOKEN_SECRET_USER, { algorithm: "HS256" })
                            let email = results[0].emailUser;
                            UserModel.findOneAndUpdate({ _id: results[0]._id }, { tokenUser: token, nbLoginTryUser: 0 }, { upsert: true }, function (error, results2) {
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
                                            message: "L'utilisateur a été authentifié avec succès",
                                            token: token
                                        });
                                }
                            });
                        } else {
                            //#region temporary password stuff
                            //console.log(results[0].temporaryPasswordUser)
                            bcrypt.compare(req.body.password, results[0].temporaryPasswordUser).then(isOk => {
                                if (isOk) {
                                    //Version that never expire
                                    var token = jwt.sign(req.body.email, JWT_TOKEN_SECRET_USER, { algorithm: "HS256" })

                                    let email = results[0].emailUser;
                                    let _id = results[0]._id;

                                    // Login user and replace his old password by the generated one
                                    const salt = bcrypt.genSaltSync(10)
                                    UserModel.findOneAndUpdate({ _id: _id }, { passwordUser: bcrypt.hashSync(req.body.password, salt), tokenUser: token, temporaryPasswordUser: "", nbLoginTryUser: 0 }, { upsert: true }, function (error, results3) {
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
                                                    message: "L'utilisateur a été authentifié avec succès (Mot de passe temporaire)",
                                                    token: token
                                                });
                                        }
                                    });

                                }
                                //#endregion
                                else {
                                    // Check number of tries and add one or change cooldown
                                    if (results[0].nbLoginTryUser >= 2) {
                                        var oldDateObj = new Date();
                                        var newDateObj = new Date();
                                        newDateObj.setTime(oldDateObj.getTime() + (5 * 60 * 1000));
                                        UserModel.findOneAndUpdate({ _id: results[0]._id }, { dateBlockCooldownUser: newDateObj, nbLoginTryUser: 0 }, { upsert: true }, function (error, results4) {
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
                                        UserModel.findOneAndUpdate({ _id: results[0]._id }, { nbLoginTryUser: (results[0].nbLoginTryUser + 1) }, { upsert: true }, function (error, results5) {
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


export { authAppRoute }
