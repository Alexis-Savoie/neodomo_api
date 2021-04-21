// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { PostModel } from "../../../models/postModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchPostRoute = express()

// Route for the export
searchPostRoute.post('/admin/searchPost', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let postSearch: any = {}

    if (req.body.emailPublisher != undefined && req.body.emailPublisher != "") {
        let regex = new RegExp(req.body.emailPublisher, "i")
        postSearch.emailPublisher = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.textContent != undefined && req.body.textContent != "") {
        let regex = new RegExp(req.body.textContent, "i")
        postSearch.textContent = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Have report part
    if (req.body.haveReport != undefined && req.body.haveReport != "") {
        if (req.body.haveReport == true)
        {
            // to check if a array is lower/greater than is to check his index with { "$exists": true }
            postSearch["listReport.0"] = { "$exists": true }
        }
        else {
            postSearch["listReport.0"] = { "$exists": false }
        }
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
    postSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }




    PostModel.find(postSearch, function (error, results) {
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
                    posts: results
                });
        }

    })
})


export { searchPostRoute }
