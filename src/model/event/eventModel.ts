import { default as Event, EventType } from "./eventSchema";
import { MongooseModel } from "../model";

export class EventModel extends MongooseModel {
  constructor() {
    super(Event);
  }

  saveEvent(eventData: EventType) {
    let event = new Event(eventData);

    // FIXME DO nothing if already in
    return Event.update(
      { id: eventData.id },
      { $setOnInsert: event },
      { upsert: true }
    ).exec();
  }

  //Todo : use findOneAndUpdate
  // update(item_id, data) {
  //   return Item.findById(item_id)
  //     .then(function(err, item) {
  //       //Alter item here
  //       return item.save();
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // }
}
