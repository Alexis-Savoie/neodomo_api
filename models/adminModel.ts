// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//#region MongoDB Connection
// Use non deprecated methods
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
let uri:string = process.env.DB_URL!
mongoose.connect(uri,  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});

//#endregion


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