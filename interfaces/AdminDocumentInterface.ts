import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"



// Interface for the model (because Mongoose doesn't do it automatically)
export default interface AdminDocumentInterface extends Document {
    emailAdmin: string;
    passwordAdmin: string;
    tokenAdmin: string;
    temporaryPasswordAdmin: string;
    nbLoginTryAdmin: number;
    dateBlockCooldownAdmin: Date;
  }