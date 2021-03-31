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



const logoutAdminRoute = express()

// Route for the export
logoutAdminRoute.delete('/admin/logout', middlewareSyntax, middlewareSessionAdmin, (req, res) => {

    AdminModel.findOneAndUpdate({ tokenAdmin: req.body.emailToken }, { tokenAdmin: "" }, { upsert: true }, function (error, results) {
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
                    message: "L'administrateur a été déconnecté avec succès"
                });
        }

    });

})


export { logoutAdminRoute }
