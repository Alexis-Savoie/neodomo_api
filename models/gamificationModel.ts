// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import GamificationDocumentInterface from '../interfaces/GamificationDocumentInterface'

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
        //console.log('Connected to MongoDb');
    }
});

//#endregion



// Schema
const GamificationSchema = new Schema<GamificationDocumentInterface>({
    emailWinner: {
        index: true,
        type: String,
        required: true,
    },
    levelGet: {
        index: true,
        type: Number,
        required: true,
    },


}, { timestamps: true })
  
const GamificationModel = mongoose.model('gamification', GamificationSchema);

export { GamificationModel }