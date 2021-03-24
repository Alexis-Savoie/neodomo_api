// Import Modules
import express from "express"


// Import Routes
import { testRouteAdmin } from "./otherRoutes/adminTestRoute"
import { createAdminRoute } from "./authRoutes/createAdminRoute"


// Add imported routes to the admin app
const adminRoutes = express()

adminRoutes.use("/", testRouteAdmin)
adminRoutes.use("/", createAdminRoute)

export { adminRoutes }