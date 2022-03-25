import { Id, NullableId, Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params: Params) {
    return super.create(data, params);
  }
  async find(params: Params){
    return super.find(params);
  }
  async get(id: Id, params: Params) {
    return super.get(id,params);
  }
  async update(id: NullableId, data: any, params: Params) {}
  async patch(id: NullableId, data: any, params: Params) {}
  async remove(id: NullableId, params: Params) {}
}

