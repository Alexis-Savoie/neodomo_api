// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { GamificationModel } from "../../../models/gamificationModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchGamificationRoute = express()

// Route for the export
searchGamificationRoute.post('/admin/searchGaming', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let gamificationSearch: any = {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailWinner != undefined && req.body.emailWinner != "") {
        let regex = new RegExp(req.body.emailWinner, "i")
        gamificationSearch.emailWinner = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.levelGet != undefined && req.body.levelGet != "") {
        gamificationSearch.levelGet = req.body.levelGet
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // CreatedAt part
    let createdAtFrom = new Date(1900, 1, 1) 
    let createdAtAt = new Date(3000, 1, 1) 
    if (req.body.createdAtFrom != undefined && req.body.createdAtFrom != "") {
        createdAtFrom = new Date(req.body.createdAtFrom)
    }
    if (req.body.createdAtAt != undefined && req.body.createdAtAt != "") {
        createdAtAt = new Date(req.body.createdAtAt)
    }
    gamificationSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }






    GamificationModel.find(gamificationSearch, function (error, results) {
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
                    gaming_events: results
                });
        }
    })
})


export { searchGamificationRoute }
