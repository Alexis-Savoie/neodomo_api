// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import CommentDocumentInterface from '../interfaces/CommentDocumentInterface'

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
const CommentSchema = new Schema<CommentDocumentInterface>({

    idPost: {
        index: true,
        type: String,
        required: true,
    },
    emailSender: {
        index: true,
        type: String,
        required: true,
    },
    textContent: {
        index: true,
        type: String,
        required: true,
    },
    replyTo: {
        index: true,
        type: String,
        required: true,
    },
    listReport: [{
        id: {
            type: String,
            required: true,
        }
    }],

}, { timestamps: true })
  
const CommentModel = mongoose.model('comment', CommentSchema);

export { CommentModel }