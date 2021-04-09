// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { MessageModel } from "../../../models/messageModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchMessageRoute = express()

// Route for the export
searchMessageRoute.post('/admin/searchMessage', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let messageSearch: any = {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailSender != undefined && req.body.emailSender != "") {
        let regex = new RegExp(req.body.emailSender, "i")
        messageSearch.emailSender = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailReceiver != undefined && req.body.emailReceiver != "") {
        let regex = new RegExp(req.body.emailReceiver, "i")
        messageSearch.emailReceiver = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.textContent != undefined && req.body.textContent != "") {
        let regex = new RegExp(req.body.textContent, "i")
        messageSearch.textContent = { $regex: regex }
    }


        
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // CreatedAt part
    let createdAtFrom = new Date(2000, 1, 1) 
    let createdAtAt = new Date(3000, 1, 1) 
    if (req.body.createdAtFrom != undefined && req.body.createdAtFrom != "") {
        createdAtFrom = new Date(req.body.createdAtFrom)
    }
    if (req.body.createdAtAt != undefined && req.body.createdAtAt != "") {
        createdAtAt = new Date(req.body.createdAtAt)
    }
    messageSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }




    MessageModel.find(messageSearch, function (error, results) {
        if (results.length == 0) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(200).json(
                {
                    error: false,
                    message: "succès (vide)"
                });
        }
        else {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(200).json(
                {
                    error: false,
                    message: "succès (non-vide)",
                    messages: results
                });
        }
    })
})


export { searchMessageRoute }
