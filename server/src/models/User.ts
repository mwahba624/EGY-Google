import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

import bookSchema from './Book.js';
import type { BookDocument } from './Book.js';

export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  savedBooks: BookDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema

    savedBooks: [bookSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
 next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have

userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;

////////////////////////////////

/*
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import bookSchema from './Book';


// Define the interface for the user document
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  savedBooks: Array<object>; // Adjust this to the actual shape of your book data
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the User Schema
const userSchema: Schema<UserDocument> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book', // Assuming there's a Book model referenced here
    },
  ],
});

// Password comparison method (you can adjust this based on your actual logic)
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return password === this.password; // Simplified example, typically you would use bcrypt
};

// Create and export the User model with the correct typing
const User: Model<UserDocument> = mongoose.model('User', userSchema);
export default User;
*/