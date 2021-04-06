// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { ProductModel } from "../../../models/productModel"

//const createAdminRouteAdminModel= require("../../models/adminModel")

// Init branch

const searchProductRoute = express()

// Route for the export
searchProductRoute.post('/admin/searchProduct', (req, res) => {
    let productSearch:any = {}

    if (req.body.nameProduct != undefined || req.body.nameProduct != "")
        productSearch.productSearch = req.body.nameProduct 
    if (req.body.description != undefined || req.body.description != "")
        productSearch.description = req.body.description 
    if (req.body.buyedBy != undefined || req.body.buyedBy != "")
        productSearch.buyedBy = req.body.buyedBy 



    if (req.body.priceMin != undefined || req.body.priceMin != "")
        productSearch.priceMin = req.body.priceMin
    else
        productSearch.priceMin = 0

    if (req.body.priceMax != undefined || req.body.priceMax != "")
        productSearch.priceMax = req.body.priceMax 
    else
        productSearch.priceMax = 2147483646

    if (req.body.availableStockMin != undefined || req.body.availableStockMin != "")
        productSearch.availableStockMin = req.body.availableStockMin 
    else
        productSearch.availableStockMin = 0

    if (req.body.availableStockMax != undefined || req.body.availableStockMax != "")
        productSearch.availableStockMax = req.body.availableStockMax 
    else
        productSearch.availableStockMax = 2147483646

    if (req.body.nbSellMin != undefined || req.body.nbSellMin != "")
        productSearch.nbSellMin = req.body.nbSellMin
    else
        productSearch.nbSellMin = 0

    if (req.body.nbSellMax != undefined || req.body.nbSellMax != "")
        productSearch.nbSellMax = req.body.nbSellMax
    else
        productSearch.nbSellMax = 2147483646



    
    let product = new ProductModel(productSearch)

    product.save()

    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
    res.status(201).json(
        {
            error: false,
            message: "Test réussi :D"
        });

})


export { searchProductRoute }
