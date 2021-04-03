import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"



// Interface for the model (because Mongoose doesn't do it automatically)
export default interface MessageDocumentInterface extends Document {
  emailSender: string;
  emailReceiver: string;
  textContent: string;
  imageURL: string;
  }