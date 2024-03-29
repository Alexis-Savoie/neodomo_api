// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { BillModel } from "../../../models/billModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchBillRoute = express()

// Route for the export
searchBillRoute.post('/admin/searchBill', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let billSearch: any = {}

    if (req.body.idBill != undefined && req.body.idBill != "") {
        billSearch._id = req.body.idBill
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.numberBill != undefined && req.body.numberBill != "") {
        billSearch.numberBill = parseInt(req.body.numberBill)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.emailBuyer != undefined && req.body.emailBuyer != "") {
        let regex = new RegExp(req.body.emailBuyer, "i")
        billSearch.emailBuyer = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.idProduct != undefined && req.body.idProduct != "") {
        billSearch.idProduct = req.body.idProduct
    }





    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // price part
    let priceMin = 0
    let priceMax = 2147483647
    if (req.body.priceMin != undefined && req.body.priceMin != "") {
        priceMin = req.body.priceMin
    }
    if (req.body.priceMax != undefined && req.body.priceMax != "") {
        priceMax = req.body.priceMax
    }
    billSearch.price = { $gte: priceMin, $lte: priceMax }


    // dateBill part
    let createdAtFrom = new Date(1900, 1, 1)
    let createdAtAt = new Date(3000, 1, 1)
    if (req.body.createdAtFrom != undefined && req.body.createdAtFrom != "") {
        createdAtFrom = new Date(req.body.createdAtFrom)
    }
    if (req.body.createdAtAt != undefined && req.body.createdAtAt != "") {
        createdAtAt = new Date(req.body.createdAtAt)
    }
    billSearch.createdAt = { $gte: createdAtFrom, $lte: createdAtAt }


    BillModel.find(billSearch, function (error, results) {
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
                    bills: results
                });
        }
    })
})


export { searchBillRoute }
