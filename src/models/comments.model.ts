// comments-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'comments';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    content: { type: String, required: true },
    by: { type: Schema.Types.ObjectId , ref: 'users' },
    parent: { type: Schema.Types.ObjectId, ref: 'comments' },
    likes: { type: Number, default: 0 },
    url: { type: String },
    username: { type: String },
    replies: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}