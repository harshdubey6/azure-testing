import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITodo {
  _id?: Types.ObjectId | string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITodoDocument extends Document {
  title: string;
  description?: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Todo || mongoose.model<ITodoDocument>('Todo', TodoSchema);
