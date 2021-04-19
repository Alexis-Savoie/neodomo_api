import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import types
import { paymentMethodType } from '../types/paymentMethodType'



// Interface for the model (because Mongoose doesn't do it automatically)
export default interface BillDocumentInterface extends Document {
  numberBill: number;
  emailBuyer: string;
  description: string;
  price: number;
  paymentMethod: paymentMethodType;
  idProduct: string;
  }