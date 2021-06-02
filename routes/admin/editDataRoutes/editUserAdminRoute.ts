// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { UserModel } from "../../../models/userModel"





const editUserAdminRoute = express()

// Route for the export
editUserAdminRoute.put('/admin/editUser', middlewareSyntax, middlewareSessionAdmin, (req, res) => {

    let userUpdate: any = {}

    if (req.body.firstname != undefined && req.body.firstname != "")
        userUpdate.firstname = req.body.firstname
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.lastname != undefined && req.body.lastname != "")
        userUpdate.lastname = req.body.lastname
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.username != undefined && req.body.username != "")
        userUpdate.username = req.body.username
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.passwordUser != undefined && req.body.passwordUser != "")
        userUpdate.passwordUser = req.body.passwordUser
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.gender != undefined && req.body.gender != "")
        userUpdate.gender = req.body.gender
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.accountType != undefined && req.body.accountType != "")
        userUpdate.accountType = req.body.accountType
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (req.body.status != undefined && req.body.status != "")
        userUpdate.status = req.body.status


    UserModel.find({ emailUser: req.body.email }, function (error, results) {
        if (results == null || results.length == 0) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(422).json(
                {
                    error: true,
                    message: "Aucun utilisateur utilise cette adresse email"
                });
        }
        else {
            UserModel.findOneAndUpdate({ emailUser: req.body.email }, userUpdate, { upsert: true }, function (error, results) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(200).json(
                    {
                        error: false,
                        message: "L'utilisateur à été modifié avec succès"
                    });
            })
        }
    })
})


export { editUserAdminRoute }
