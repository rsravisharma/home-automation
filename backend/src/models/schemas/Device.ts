import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IDevice {
  name: string;
  user: mongoose.ObjectId,
  token: string;
  model: string,
  pins: Array<{
    number: number, /// for esp32 {DG: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33, 34, 35, 36,], AN: [32, 33, 34, 35, 36, 37, 38, 39]}
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
    type: {type:String},
    value: Number
  }]
});

// 3. Create a Model.
export default model<IDevice>('Device', DeviceSchema);