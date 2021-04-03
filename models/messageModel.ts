// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import MessageDocumentInterface from '../interfaces/MessageDocumentInterface'

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
const MesssageSchema = new Schema<MessageDocumentInterface>({
    emailSender: {
        index: true,
        type: String,
        required: true,
    },
    emailReceiver: {
        index: true,
        type: String,
        required: true,
    },
    textContent: {
        index: true,
        type: String,
        required: true,
    },
    imageURL: {
        index: true,
        type: String,
        required: true,
    },

}, { timestamps: true })
  
const MessageModel = mongoose.model('message', MesssageSchema);

export { MessageModel }