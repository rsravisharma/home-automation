import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IDevice {
  name: string;
  user: mongoose.ObjectId,
  token: string;
  model: string,
  pins: Array<{
    number: number,
    mode: string,
    type: string,
    value: number
  }>
}

// 2. Create a Schema corresponding to the document interface.
const DeviceSchema = new Schema<IDevice>({
  name: { type: String, required: true },
  user: mongoose.Types.ObjectId,
  token: String,
  model: String,
  pins: [{
    number: {type: Number, unique: true},
    mode: String,
    type: String,
    value: Number
  }]
});

// 3. Create a Model.
export default model<IDevice>('Device', DeviceSchema);