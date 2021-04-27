// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { PurchaseModel } from "../../../models/purchaseModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchPurchaseRoute = express()

// Route for the export
searchPurchaseRoute.post('/admin/searchPurchase', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let purchaseSearch: any = {}


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailBuyer != undefined && req.body.emailBuyer != "") {
        let regex = new RegExp(req.body.emailBuyer, "i")
        purchaseSearch.emailBuyer = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.idProduct != undefined && req.body.idProduct != "") {
        purchaseSearch.idProduct = req.body.idProduct
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    // dateBill part
    let createdAtFrom = new Date(1900, 1, 1)
    let createdAtAt = new Date(3000, 1, 1)
    if (req.body.createdAtFrom != undefined && req.body.createdAtFrom != "") {
        createdAtFrom = new Date(req.body.createdAtFrom)
    }
    if (req.body.createdAtAt != undefined && req.body.createdAtAt != "") {
        createdAtAt = new Date(req.body.createdAtAt)
    }
    purchaseSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }


    PurchaseModel.find(purchaseSearch, function (error, results) {
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
                    purchases: results
                });
        }
    })
})


export { searchPurchaseRoute }
