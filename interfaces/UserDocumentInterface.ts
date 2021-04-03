import mongoose from 'mongoose'
import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Import interfaces
import listEmailInterface from '../interfaces/listEmailInterface'

// Import types
import { genderType } from '../types/genderType'
import { accountType } from '../types/accountType'


// Interface for the model (because Mongoose doesn't do it automatically)
export default interface UserDocumentInterface extends Document {
  emailUser: string;
  username: string;
  firstname: string;
  lastname: string;
  gender: genderType;
  accountType: accountType;
  status: String;
  passwordUser: String;
  temporaryPasswordUser: String;
  tokenUser: String;
  nbLoginTryUser: Number;
  dateBlockCooldownUser: Date;
  accountActivate: Boolean;
  activationCode: String;
  isBlocked: Boolean;
  domoBalance: Number;
  lastActivity: Date;
  currentStreak: Number;
  listFollow: listEmailInterface;
  listFollowed: listEmailInterface;
  listMuted: listEmailInterface;
  listAssociationJoined: listEmailInterface;
  ListAssociationMember: listEmailInterface;
}