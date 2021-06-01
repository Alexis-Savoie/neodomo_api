import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { reportType } from '../types/reportType'



// Interface for the model (because Mongoose doesn't do it automatically)
export default interface ReportDocumentInterface extends Document {
  emailReporter: string;
  emailReported: string;
  typeReport: reportType;
  dateReport: Date;
  }