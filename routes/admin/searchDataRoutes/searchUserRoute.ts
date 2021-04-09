// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { UserModel } from "../../../models/userModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchUserRoute = express()

// Route for the export
searchUserRoute.post('/admin/searchUser', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let userSearch: any = {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailUser != undefined && req.body.emailUser != "") {
        let regex = new RegExp(req.body.emailUser, "i")
        userSearch.emailUser = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.firstname != undefined && req.body.firstname != "") {
        let regex = new RegExp(req.body.firstname, "i")
        userSearch.firstname = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.lastname != undefined && req.body.lastname != "") {
        let regex = new RegExp(req.body.lastname, "i")
        userSearch.lastname = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.accountType != undefined && req.body.accountType != "") {
        userSearch.accountType = req.body.accountType
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.status != undefined && req.body.status != "") {
        let regex = new RegExp(req.body.status, "i")
        userSearch.status = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.isBlocked != undefined && req.body.isBlocked != "") {
        userSearch.isBlocked = req.body.isBlocked
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
    userSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }

    // lastActivityAt part
    let lastActivityFrom = new Date(2000, 1, 1)
    let lastActivityAt = new Date(3000, 1, 1)
    if (req.body.lastActivityFrom != undefined && req.body.lastActivityFrom != "") {
        lastActivityFrom = new Date(req.body.lastActivityFrom)
    }
    if (req.body.lastActivityAt != undefined && req.body.lastActivityAt != "") {
        lastActivityAt = new Date(req.body.lastActivityAt)
    }
    userSearch.lastActivity = { $gte: lastActivityFrom, $lte: lastActivityAt }




    UserModel.find(userSearch, function (error, results) {
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
                    users: results
                });
        }
    })
})


export { searchUserRoute }
