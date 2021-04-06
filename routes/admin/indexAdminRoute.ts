// Import Modules
import express from "express"


// Add imported routes to the admin app
const adminRoutes = express()


// Import Routes to group them and then export them

// Auth Routes
import { testRouteAdmin } from "./otherRoutes/adminTestRoute"
adminRoutes.use("/", testRouteAdmin)
import { createAdminRoute } from "./authRoutes/createAdminRoute"
adminRoutes.use("/", createAdminRoute)
import { authAdminRoute } from "./authRoutes/authAdminRoute"
adminRoutes.use("/", authAdminRoute)
import { logoutAdminRoute } from "./authRoutes/logoutAdminRoute"
adminRoutes.use("/", logoutAdminRoute)
import { changePasswordAdminRoute } from "./authRoutes/changePasswordAdminRoute"
adminRoutes.use("/", changePasswordAdminRoute)
import { forgotPasswordAdminRoute } from "./authRoutes/forgotPasswordAdminRoute"
adminRoutes.use("/", forgotPasswordAdminRoute)

// Search Routes
import { searchPostRoute } from "./searchDataRoutes/searchPostRoute"
adminRoutes.use("/", searchPostRoute)


export { adminRoutes }