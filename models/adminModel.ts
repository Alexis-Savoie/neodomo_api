// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"


// Schema
const AdminSchema = new Schema({
    emailAdmin: {
        trim: true,
        index: true,
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    passwordAdmin: {
        index: true,
        type: String,
        required: true,
    },

    tokenAdmin: {
        index: true,
        type: String,
    },

    temporaryPasswordAdmin: {
        index: true,
        type: String,
        default: ""
    },

    nbLoginTryAdmin: {
        index: true,
        type: Number,
        default: 0
    },

    dateBlockCooldownAdmin: {
        index: true,
        type: Date,
        default: Date.parse('01 Jan 1970 00:00:00')
    }

}, { timestamps: true })
  
const AdminModel = mongoose.model('admin', AdminSchema);

export { AdminModel }