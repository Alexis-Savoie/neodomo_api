import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

//Import interfaces
import listURLInterface from './listURLInterface'
import listIDInterface from './listIDInterface'


// Interface for the model (because Mongoose doesn't do it automatically)
export default interface PostDocumentInterface extends Document {
    emailPublisher: string;
    textContent: string;
    listImage: listURLInterface;
    listLike: listIDInterface;
    listComment: listIDInterface;
    listReport: listIDInterface;
  }