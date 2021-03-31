// Import Modules
import express from "express"


// Import Routes
import { testRouteAdmin } from "./otherRoutes/adminTestRoute"
import { createAdminRoute } from "./authRoutes/createAdminRoute"
import { authAdminRoute } from "./authRoutes/authAdminRoute"
import { logoutAdminRoute } from "./authRoutes/logoutAdminRoute"
import { changePasswordAdminRoute } from "./authRoutes/changePasswordAdminRoute"
import { forgotPasswordAdminRoute } from "./authRoutes/forgotPasswordAdminRoute"



// Add imported routes to the admin app
const adminRoutes = express()

adminRoutes.use("/", testRouteAdmin)
adminRoutes.use("/", createAdminRoute)
adminRoutes.use("/", authAdminRoute)
adminRoutes.use("/", logoutAdminRoute)
adminRoutes.use("/", changePasswordAdminRoute)
adminRoutes.use("/", forgotPasswordAdminRoute)

export { adminRoutes }