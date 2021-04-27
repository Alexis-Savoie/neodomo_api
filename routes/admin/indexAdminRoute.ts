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


// Edit data routes
import { addProductRoute } from "./editDataRoutes/addProductRoute"
adminRoutes.use("/", addProductRoute)
import { blockUserRoute } from "./editDataRoutes/blockUserRoute"
adminRoutes.use("/", blockUserRoute)
import { deleteBillRoute } from "./editDataRoutes/deleteBillRoute"
adminRoutes.use("/", deleteBillRoute)
import { deleteCommentRoute } from "./editDataRoutes/deleteCommentRoute"
adminRoutes.use("/", deleteCommentRoute)
import { deleteMessageRoute } from "./editDataRoutes/deleteMessageRoute"
adminRoutes.use("/", deleteMessageRoute)
import { deletePostRoute } from "./editDataRoutes/deletePostRoute"
adminRoutes.use("/", deletePostRoute)
import { deleteProductRoute } from "./editDataRoutes/deleteProductRoute"
adminRoutes.use("/", deleteProductRoute)
import { editProductRoute } from "./editDataRoutes/editProductRoute"
adminRoutes.use("/", editProductRoute)
import { editUserAdminRoute } from "./editDataRoutes/editUserAdminRoute"
adminRoutes.use("/", editUserAdminRoute)




// Search data routes
import { searchBillRoute } from "./searchDataRoutes/searchBillRoute"
adminRoutes.use("/", searchBillRoute)
import { searchPurchaseRoute } from "./searchDataRoutes/searchPurchaseRoute"
adminRoutes.use("/", searchPurchaseRoute)
import { searchCommentRoute } from "./searchDataRoutes/searchCommentRoute"
adminRoutes.use("/", searchCommentRoute)
import { searchGamificationRoute } from "./searchDataRoutes/searchGamificationRoute"
adminRoutes.use("/", searchGamificationRoute)
import { searchMessageRoute } from "./searchDataRoutes/searchMessageRoute"
adminRoutes.use("/", searchMessageRoute)
import { searchPostRoute } from "./searchDataRoutes/searchPostRoute"
adminRoutes.use("/", searchPostRoute)
import { searchProductRoute } from "./searchDataRoutes/searchProductRoute"
adminRoutes.use("/", searchProductRoute)
import { searchUserRoute } from "./searchDataRoutes/searchUserRoute"
adminRoutes.use("/", searchUserRoute)





export { adminRoutes }