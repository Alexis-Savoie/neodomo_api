// Import Modules
import express from "express"


// Add imported routes to the admin app
const adminRoutes = express()


// Import Routes to group them and then export them

// Auth routes
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

// Search data routes
import { searchPostRoute } from "./searchDataRoutes/searchPostRoute"
adminRoutes.use("/", searchPostRoute)
import { searchProductRoute } from "./searchDataRoutes/searchProductRoute"
adminRoutes.use("/", searchProductRoute)


// Edit data routes
import { addProductRoute } from "./editDataRoutes/addProductRoute"
adminRoutes.use("/", addProductRoute)

export { adminRoutes }