// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import PostDocumentInterface from '../interfaces/PostDocumentInterface'

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
const PostSchema = new Schema<PostDocumentInterface>({
    emailPublisher: {
        trim: true,
        index: true,
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    textContent: {
        index: true,
        type: String,
        required: true,
    },

    listImage: [{
        URL: {
            type: String,
            required: true,
        }
    }],

    listLike: [{
        id: {
            type: String,
            required: true,
        }
    }],

    listComment: [{
        id: {
            type: String,
            required: true,
        }
    }],

    listReport: [{
        id: {
            type: String,
            required: true,
        }
    }],

}, { timestamps: true })
  
const PostModel = mongoose.model('post', PostSchema);

export { PostModel }