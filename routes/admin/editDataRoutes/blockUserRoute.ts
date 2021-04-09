// Import npm modules
import express from 'express'

// Import middleware
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'
import { middlewareSessionAdmin } from '../../../middlewares/middlewareSessionAdmin'

// Import models
import { UserModel } from "../../../models/userModel"





const blockUserRoute = express()

// Route for the export
blockUserRoute.put('/admin/blockUser', middlewareSyntax, middlewareSessionAdmin, (req, res) => {

    UserModel.find({ emailUser: req.body.email }, function (error, results) {
        if (error) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(500).json(
                {
                    error: true,
                    message: "Server Error"
                });
        }
        else {
            if (results.length == 0) {
                res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                res.status(422).json(
                    {
                        error: true,
                        message: "Aucun utilisateur utilise cette adresse email"
                    });
            }
            else {
                if (results[0].isBlocked == false) {
                    UserModel.findOneAndUpdate({ emailUser: req.body.email }, { isBlocked: true }, { upsert: true }, function (error, results) {
                        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                        res.status(200).json(
                            {
                                error: false,
                                message: "L'utilisateur à été bloqué avec succès"
                            });
                    })
                }
                else {
                    UserModel.findOneAndUpdate({ emailUser: req.body.email }, { isBlocked: false }, { upsert: true }, function (error, results) {
                        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                        res.status(200).json(
                            {
                                error: false,
                                message: "L'utilisateur à été débloqué avec succès"
                            });
                    })
                }
            }
        }
    })
})


export { blockUserRoute }
