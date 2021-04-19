import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import listIDInterface from './listIDInterface'



// Interface for the model (because Mongoose doesn't do it automatically)
export default interface CommentDocumentInterface extends Document {
  idPost: string;
  emailSender: string;
  textContent: string;
  replyTo: string;
  listReport: listIDInterface
  }