// Import npm modules
import express from 'express'

// Import middlewares
import { middlewareSyntax } from '../../../middlewares/middlewareSyntax'

// Create express instance for export
const testRouteUser =  express() 


// Route to export
testRouteUser.get('/application/test',  middlewareSyntax, (req, res) => {

    console.log("Test worked yay (application) !!")
    res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
    res.status(200).json({message: "bonjour neoDomo (application)"});
})


export { testRouteUser } 
