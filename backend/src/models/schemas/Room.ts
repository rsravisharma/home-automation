import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IRoom {
  name: string;
  user: mongoose.ObjectId,
  components: Array<{
    device: mongoose.Types.ObjectId,
    type: String,
    pins: Array<{
      [key: string]: mongoose.ObjectId
    }>
  }>,
}

// 2. Create a Schema corresponding to the document interface.
const RoomSchema = new Schema<IRoom>({
  name: String, 
  user: mongoose.Types.ObjectId,
  components: [{
    device: mongoose.Types.ObjectId,
    type: String,
    pins: [mongoose.Schema.Types.Mixed]
  }],
});

// 3. Create a Model.
export default model<IRoom>('Room', RoomSchema);