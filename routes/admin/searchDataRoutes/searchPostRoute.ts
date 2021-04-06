// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { UserModel } from "../../../models/userModel"

//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchPostRoute = express()

// Route for the export
searchPostRoute.post('/admin/searchPost', (req, res) => {

    let admin = new AdminModel({
        emailAdmin: req.body.email,
        passwordAdmin: req.body.password
    })

    let user = new UserModel({
        emailUser: req.body.email,
        passwordUser: req.body.password,
        listFollow: [{
            emailUser: "test1@email.fr"
        },
        {
            emailUser: "test2@email.fr"
        }]

    })
    user.save()
    admin.save()
    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
    res.status(201).json(
        {
            error: false,
            message: "Test réussi :D"
        });

})


export { searchPostRoute }
