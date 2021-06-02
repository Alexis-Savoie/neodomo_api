// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import PurchaseDocumentInterface from '../interfaces/PurchaseDocumentInterface'


// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//#region MongoDB Connection
// Use non deprecated methods
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const uri = process.env.DB_URL as string
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
const PurchaseSchema = new Schema<PurchaseDocumentInterface>({
    emailBuyer: {
        index: true,
        type: String,
        required: true,
    },
    quantity: {
        index: true,
        type: Number,
        required: true,
    },
    price: {
        index: true,
        type: Number,
        required: true,
    },
    idProduct: {
        index: true,
        type: String,
        required: true,
    },
}, { timestamps: true })
  
const PurchaseModel = mongoose.model('purchase', PurchaseSchema);

export { PurchaseModel }