// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionUser } from '../../../middlewares/middlewareSessionUser'

// Import models
import { UserModel } from "../../../models/userModel"

//const createAdminRouteAdminModel= require("../../models/userModel")



const logoutAppRoute = express()

// Route for the export
logoutAppRoute.delete('/application/logout', middlewareSyntax, middlewareSessionUser, (req, res) => {

    UserModel.findOneAndUpdate({ tokenUser: req.body.emailToken }, { tokenUser: "" }, { upsert: true }, function (error, results) {
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
                    message: "L'utilisateur a été déconnecté avec succès"
                });
        }

    });

})


export { logoutAppRoute }
