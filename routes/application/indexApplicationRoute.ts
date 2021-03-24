// Import Modules
import express from "express"


// Import Routes
import { testRouteAdmin } from "./otherRoutes/applicationTestRoute"
import { createAdminRoute } from "../admin/authRoutes/createAdminRoute"


// Add imported routes to the admin app
const applicationRoutes = express()

applicationRoutes.use("/", testRouteAdmin)
applicationRoutes.use("/", createAdminRoute)

export { applicationRoutes }