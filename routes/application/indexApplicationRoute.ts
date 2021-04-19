// Import Modules
import express from "express"


// Import Routes
import { testRouteUser } from "./otherRoutes/applicationTestRoute"
import { createUserRoute } from "../application/authRoutes/createUserRoute"
import { changePasswordUserRoute } from "../application/authRoutes/changePasswordUserRoute"
import { authUserRoute } from "../application/authRoutes/authUserRoute"
import { logoutAppRoute } from "../application/authRoutes/logoutUserRoute"
import { forgotPasswordUserRoute } from "../application/authRoutes/forgotPasswordUserRoute"

import { addProductRoute } from "./shopRoutes/addProductRoute"
import { deleteProductRoute } from "./shopRoutes/deleteProductRoute"
import { editProductRoute } from "./shopRoutes/editProductRoute"

import { deleteCommentRoute } from "./postRoutes/deleteComment"


// Add imported routes to the admin app
const applicationRoutes = express()

applicationRoutes.use("/", testRouteUser)

applicationRoutes.use("/", createUserRoute)
applicationRoutes.use("/", changePasswordUserRoute)
applicationRoutes.use("/", logoutAppRoute)
applicationRoutes.use("/", authUserRoute)
applicationRoutes.use("/", forgotPasswordUserRoute)

applicationRoutes.use("/", addProductRoute)
applicationRoutes.use("/", deleteProductRoute)
applicationRoutes.use("/", editProductRoute)

applicationRoutes.use("/", deleteCommentRoute)

export { applicationRoutes }