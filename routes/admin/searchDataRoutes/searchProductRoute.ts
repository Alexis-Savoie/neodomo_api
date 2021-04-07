// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'
import { middlewareSyntaxSearchNumber } from '../../../middlewares/middlewareSyntaxSearchNumber'

// Import models
import { ProductModel } from "../../../models/productModel"


//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchProductRoute = express()

// Route for the export
searchProductRoute.post('/admin/searchProduct', middlewareSessionAdmin, middlewareSyntaxSearchNumber, (req, res) => {
    let productSearch: any = {}

    if (req.body.nameProduct != undefined && req.body.nameProduct != "") {
        let regex = new RegExp(req.body.nameProduct, "i")
        productSearch.nameProduct = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.description != undefined && req.body.description != "") {
        let regex = new RegExp(req.body.description, "i")
        productSearch.description = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.buyedBy != undefined && req.body.buyedBy != "") {
        let regex = new RegExp(req.body.buyedBy, "i")
        productSearch.buyedBy = { $regex: regex }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Price part
    let priceMin = 0
    let priceMax = 2147483647
    if (req.body.priceMin != undefined && req.body.priceMin != "") {
        priceMin = parseInt(req.body.priceMin)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.priceMax != undefined && req.body.priceMax != "") {
        priceMax = parseInt(req.body.priceMax)
    }
    productSearch.price = { $gte: priceMin, $lte: priceMax }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Stock part
    let availableStockMin = 0
    let availableStockMax = 2147483647
    if (req.body.availableStockMin != undefined && req.body.availableStockMin != "") {
        availableStockMin = parseInt(req.body.availableStockMin)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.availableStockMax != undefined && req.body.availableStockMax != "") {
        availableStockMax = parseInt(req.body.availableStockMax)
    }
    productSearch.availableStock = { $gte: availableStockMin, $lte: availableStockMax }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Vente part
    let nbSellMin = 0
    let nbSellMax = 2147483647
    if (req.body.nbSellMin != undefined && req.body.nbSellMin != "") {
        nbSellMin = parseInt(req.body.nbSellMin)
        nbSellMin = nbSellMin - 1
    }
    else
        nbSellMin = -1
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.nbSellMax != undefined && req.body.nbSellMax != "") {
        nbSellMax = parseInt(req.body.nbSellMax)
        nbSellMax = nbSellMax - 1
    }
    else
        nbSellMax = -1
    // to check if a array is lower/greater than is to check his index with { "$exists": true }
    let nbSellMinQuery = "listBill" + "." + nbSellMin.toString()
    let nbSellMaxQuery = "listBill" + "." + nbSellMax.toString()
    if (nbSellMin >= 0)
        productSearch[nbSellMinQuery] = { "$exists": true }
    else
        productSearch[nbSellMinQuery] = { "$exists": false }
    
    if (nbSellMax >= 0)
        productSearch[nbSellMaxQuery] = { "$exists": true }
    else
        productSearch[nbSellMaxQuery] = { "$exists": false }



    ProductModel.find(productSearch, function (error, results) {
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
                    products: results
                });
        }

    })




})


export { searchProductRoute }
