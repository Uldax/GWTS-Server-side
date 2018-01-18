
import * as mongoose from "mongoose";

export type EventType = mongoose.Document & {
  thumbPath: string;
  text: string;
  title: string;
};

//Definition of one item
const eventSchema = new mongoose.Schema({
  thumbPath: {
    type: String
  },
  title: {
    type: String
  },
  text: {
    type: String
  },
});
const Event = mongoose.model("Event", eventSchema);
export default Event;
