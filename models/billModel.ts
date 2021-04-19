// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import BillDocumentInterface from '../interfaces/BillDocumentInterface'


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
const BillSchema = new Schema<BillDocumentInterface>({
    numberBill: {
        index: true,
        type: Number,
        required: true,
        unique: true,
    },
    emailBuyer: {
        index: true,
        type: String,
        required: true,
    },
    description: {
        index: true,
        type: String,
        required: true,
    },
    price: {
        index: true,
        type: Number,
        required: true,
    },
    paymentMethod: {
        index: true,
        type: String,
        enum: ['CB' , 'other'],
        required: true,
    },
    dateBill: {
        index: true,
        type: String,
        required: true,
    },
    idProduct: {
        index: true,
        type: String,
        required: true,
    },

}, { timestamps: true })
  
const BillModel = mongoose.model('bill', BillSchema);

export { BillModel }