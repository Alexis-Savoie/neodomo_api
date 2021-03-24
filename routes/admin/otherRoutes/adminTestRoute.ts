// Import npm modules
import express from 'express'


// Import middlewares
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'

// Create express instance for export
const testRouteAdmin =  express() 


// Route to export
testRouteAdmin.get('/admin/test',  middlewareSyntax, (req, res) => {

    console.log("Test worked yay (admin) !!")
    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
    res.status(200).json({message: "bonjour neoDomo (admin)"});
})


export { testRouteAdmin } 
