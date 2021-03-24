// Import Modules
import express from "express"

// Import Routes
import { adminRoutes } from "./admin/indexAdminRoute"
import { applicationRoutes } from "./application/indexApplicationRoute"

// Add application and admin routes to the main app
const routes = express()

routes.use("/", applicationRoutes)
routes.use("/", adminRoutes)

export { routes }