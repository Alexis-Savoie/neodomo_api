// MImport npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
//const createAdminRouteAdminModel= require("../../models/adminModel")

const createAdminRoute = express()

// Route for the export
createAdminRoute.post('/admin/createAdmin', (req, res) => {
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
            if (results.length > 0)
            {
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
                const salt = bcrypt.genSaltSync(10)
                admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
                admin.save()
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(201).json(
                    {
                        error: false,
                        message: "L'administrateur a été créer avec succès"
                    });
            }
        }

    })

})


export { createAdminRoute }
