// Import npm modules
import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import UserDocumentInterface from '../interfaces/UserDocumentInterface'



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
const UserSchema = new Schema<UserDocumentInterface>({
    emailUser: {
        trim: true,
        index: true,
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    username: {
        trim: true,
        index: true,
        type: String,
        lowercase: true,
    },

    firstname: {
        trim: true,
        index: true,
        type: String,
        lowercase: true,
    },

    lastname: {
        trim: true,
        index: true,
        type: String,
        lowercase: true,
    },

    gender: {
        trim: true,
        index: true,
        type: String,
        enum: ['H', 'F', 'A']
    },

    accountType: {
        trim: true,
        index: true,
        type: String,
        enum: ['eleve', 'staff', 'association']
    },

    status: {
        trim: true,
        index: true,
        type: String,
        default: 'eleve'
    },

    passwordUser: {
        index: true,
        type: String,
        required: true,
    },

    temporaryPasswordUser: {
        index: true,
        type: String,
        default: ""
    },

    tokenUser: {
        index: true,
        type: String,
    },

    nbLoginTryUser: {
        index: true,
        type: Number,
        default: 0
    },

    dateBlockCooldownUser: {
        index: true,
        type: Date,
        default: Date.parse('01 Jan 1970 00:00:00')
    },

    accountActivate: {
        index: true,
        type: Boolean,
        default: false
    },

    activationCode: {
        index: true,
        type: String,
    },

    isBlocked: {
        index: true,
        type: Boolean,
        default: false
    },

    domoBalance: {
        index: true,
        type: Number,
        default: 0
    },

    lastActivity: {
        index: true,
        type: Date,
        default: Date.parse('01 Jan 1970 00:00:00')
    },

    currentStreak: {
        index: true,
        type: Number,
        default: 0
    },

    listFollow: [{
        emailUser: {
            type: String,
            required: true,
        }
    }],

    listFollowed: [{
        emailUser: {
            type: String,
            required: true,
        }
    }],

    listMuted: [{
        emailUser: {
            type: String,
            required: true,
        }
    }],

    listAssociationJoined: [{
        emailUser: {
            type: String,
            required: true,
        }
    }],

    ListAssociationMember: [{
        emailUser: {
            type: String,
            required: true,
        }
    }]



}, { timestamps: true })
  
const UserModel = mongoose.model('user', UserSchema);

export { UserModel }