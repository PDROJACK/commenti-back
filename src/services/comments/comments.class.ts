import { Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import usersModel from '../../models/users.model';
import { Users } from '../users/users.class';

export class Comments extends Service {

  users;

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    // this.users = app.service("users");
    this.users = usersModel(app);
  }

  // Add a comment
  async create(data: any, params: Params) {
      
      if(!data.email) return null;

      let user = await this.users.findOne({ email: data.email });

      if(!user){
        user = await this.users.create({
            email: data.email
        })
      }

      // Attach user to comment
      data.by = user._id;

      console.log(data);

      return super.create(data,params);

  }

  // Find all the comments related to a URL
  async find(params: Params) {

    if(params.query && !params.query.url ) {
      throw new Error("No url found");
    }

    const comments = await super.find({
      query: {
        $limit: 10,
        $skip:  10  * ( params.query ? params.query.page-1 : 0 ),
        url: params.query ? params.query.url : null,
        //  $populate: ['by', 'replies', {
        //   path: "replies",
        //   populate: "by"
        // }]
      }
    })

    return comments;

  }

}