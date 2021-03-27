// MImport npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import mongoose from 'mongoose'

// Import models
import { AdminModel } from "../../../models/adminModel"
//const createAdminRouteAdminModel= require("../../models/adminModel")

const createAdminRoute = express()

// Route for the export
createAdminRoute.post('/admin/createAdmin', (req, res) => {

    let admin = new AdminModel({
        emailAdmin: "testEmail222",
        passwordAdmin: "testmpd"
    })
    admin.save()
    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
    res.status(201).json(
        {
            error: false,
            message: "youpi"
        });

})


export { createAdminRoute } 
