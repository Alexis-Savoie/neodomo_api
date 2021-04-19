// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import ProductDocumentInterface from '../interfaces/ProductDocumentInterface'

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
const ProductSchema = new Schema<ProductDocumentInterface>({
    nameProduct: {
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
    availableStock: {
        index: true,
        type: Number,
        required: true,
    },
    imageURL: {
        index: true,
        type: String,
        required: true,
    },
    listBill: [{
        id: {
            type: String,
            required: true,
        }
    }],

}, { timestamps: true })
  
const ProductModel = mongoose.model('product', ProductSchema);

export { ProductModel }