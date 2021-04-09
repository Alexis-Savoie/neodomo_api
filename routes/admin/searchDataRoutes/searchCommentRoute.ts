// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { CommentModel } from "../../../models/commentModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchCommentRoute = express()

// Route for the export
searchCommentRoute.post('/admin/searchComment', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let commentSearch: any = {}

    if (req.body.idPost != undefined && req.body.idPost != "") {
        commentSearch.idPost = req.body.idPost 
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailSender != undefined && req.body.emailSender != "") {
        let regex = new RegExp(req.body.emailSender, "i")
        commentSearch.emailSender = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.textContent != undefined && req.body.textContent != "") {
        let regex = new RegExp(req.body.textContent, "i")
        commentSearch.textContent = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.replyTo != undefined && req.body.replyTo != "") {
        commentSearch.replyTo = req.body.replyTo 
    }

    // Have report part
    if (req.body.haveReport != undefined && req.body.haveReport != "") {
        if (req.body.haveReport == true)
        {
            // to check if a array is lower/greater than is to check his index with { "$exists": true }
            commentSearch["listReport.0"] = { "$exists": true }
        }
        else {
            commentSearch["listReport.0"] = { "$exists": false }
        }
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
    commentSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }




    CommentModel.find(commentSearch, function (error, results) {
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
                    comments: results
                });
        }
    })
})


export { searchCommentRoute }
