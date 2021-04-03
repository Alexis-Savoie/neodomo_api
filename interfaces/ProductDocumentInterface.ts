import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import listIDInterface from './listIDInterface'



// Interface for the model (because Mongoose doesn't do it automatically)
export default interface ProductDocumentInterface extends Document {
  nameProduct: string;
  description: string;
  price: number;
  availableStock: number;
  imageURL: string;
  listBill: listIDInterface;
  }