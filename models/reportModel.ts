// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import ReportDocumentInterface from '../interfaces/ReportDocumentInterface'

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
const ReportSchema = new Schema<ReportDocumentInterface>({
    emailReporter: {
        index: true,
        type: String,
        required: true,
    },
    emailReported: {
        index: true,
        type: String,
        required: true,
    },
    typeReport: {
        index: true,
        type: String,
        enum: ["post", "comment"],
        required: true,
    },
    dateReport: {
        index: true,
        type: Date,
        required: true,
    },

}, { timestamps: true })
  
const ReportModel = mongoose.model('report', ReportSchema);

export { ReportModel }