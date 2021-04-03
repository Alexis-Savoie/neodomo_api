// Import npm modules
import express from 'express'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import models
import { AdminModel } from "../models/adminModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
let JWT_TOKEN_SECRET_ADMIN: string = process.env.JWT_TOKEN_SECRET_ADMIN!

const middlewareSessionAdmin = (req: any, res: any, next: any) => {
    // Get headers and extract token

    if (req.get("Authorization") !== undefined) {

        let token = req.get("Authorization").split(" ")[1]

        // no data case
        if (token == "" || token.trim().length == 0) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(401).json(
                {
                    error: true,
                    message: "Votre token n'est pas correct"
                });

        } else {
            req.body.emailToken = token
            AdminModel.find({ tokenAdmin: token }, function (error, results) {
                if (error) {
                    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                    res.status(500).json(
                        {
                            error: true,
                            message: "Server Error"
                        });
                }
                else {
                    if (results === undefined || results.length == 0) {
                        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                        res.status(401).json(
                            {
                                error: true,
                                message: "Votre token n'est pas correct"
                            });
                    }
                    else {
                        var success = true
                        try {
                            var decoded = jwt.verify(token, JWT_TOKEN_SECRET_ADMIN);
                            req.body.email = decoded
                        } catch (e) {
                            success = false
                            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
                            res.status(401).json(
                                {
                                    error: true,
                                    message: "Votre token n'est pas correct"
                                });
                        }
                        if (success == true) {
                            next();
                        }
                    }
                }
            })
        }
    }
    else {
        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
        res.status(401).json(
            {
                error: true,
                message: "Votre token n'est pas correct"
            });
    }
};


// Exports all the functions
export { middlewareSessionAdmin }