import { Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

export class Comments extends Service {

  users;

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.users = app.service("users");
  }

  // Add a comment
  async create(data: any, params: Params) {

      // Attach user to comment
      data.by = params.user !== undefined ? params.user._id : null;
 
      return super.create(data,params);
  }

  // Find all the comments related to a URL
  async find(params: Params) {

    if(params.query && !params.query.url ) {
      throw new Error("No url found");
    }

    const comments = await super.find({
      query: {
        url: params.query ? params.query.url : null,
        $populate: ['by', 'replies', {
          path: "replies",
          populate: "by"
        }]
      }
    })

    return comments;

  }

}
