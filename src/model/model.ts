import * as mongoose from "mongoose";


class MongooseModel {
  readonly model: mongoose.Model<mongoose.Document>;

  constructor(schema: mongoose.Model<mongoose.Document>) {
    this.model = schema;
  }

  public async getById(objectId: mongoose.Types.ObjectId) {
    const doc = await this.model.findById(objectId);
    this.throwIfNotFound(doc, objectId)
    return doc
  }
  private throwIfNotFound(doc: any, request: any) {
    if (!doc) {
      throw new Error(
        `${request} doesn't exists`
      );
    }
  }
  public async get(objectRequest: any) {
    const doc = await this.model.find(objectRequest)
    this.throwIfNotFound(doc, objectRequest)
    return doc;

  }

  delete(objectId: mongoose.Types.ObjectId): mongoose.DocumentQuery<any, any> {
    return this.model.findOneAndRemove({ _id: objectId });
  }

  gets(objectIds: Array<mongoose.Types.ObjectId>) {
    return this.model.find({
      item_id: {
        $in: objectIds
      }
    });
  }
}

export { MongooseModel };
