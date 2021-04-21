// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { AdminModel } from "../../../models/adminModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
let RESETEMAIL: string = process.env.RESETEMAIL!
let RESETPASSWORD: string = process.env.RESETPASSWORD!



const forgotPasswordAdminRoute = express()

// Route for the export
forgotPasswordAdminRoute.post('/admin/forgotPassword', middlewareSyntax, (req, res) => {

    AdminModel.find({ emailAdmin: req.body.email }).then((user: any) => {
        if (user.length == 0) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(422).json(
                {
                    error: true,
                    message: "Aucun administrateur utilise cette adresse email"
                });
        }
        else {
            var generator = require('generate-password');
            var temporaryPassword = generator.generate({
                length: 10,
                numbers: true
            });
            const salt = bcrypt.genSaltSync(10)
            AdminModel.findOneAndUpdate({ emailAdmin: req.body.email }, { temporaryPasswordAdmin: bcrypt.hashSync(temporaryPassword, salt) }, { upsert: true }, function(error: any, doc: any) {
                if (error) {
                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                    res.status(500).json(
                        {
                            error: true,
                            message: "Server Error"
                        });
                }
                else {
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: RESETEMAIL,
                            pass: RESETPASSWORD
                        }
                    });

                    let mailOptions = {
                        from: RESETEMAIL,
                        to: req.body.email,
                        subject: "Mot de passe temporaire NeoDomo 👻", // Subject line
                        text: "Voici votre mot de passe temporaire: " + temporaryPassword,
                    };

                    transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {
                            console.log("erreur 2")
                            console.log(RESETPASSWORD)
                            console.log(err)
                            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                            res.status(500).json(
                                {
                                    error: true,
                                    message: "Server Error"
                                });
                        } else {
                            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                            res.status(200).json(
                                {
                                    error: false,
                                    message: "Un mot de passe administrateur temporaire à été envoyé à cette adresse email"
                                });
                        }
                    })
                }
            })
        }
    })

})


export { forgotPasswordAdminRoute }
