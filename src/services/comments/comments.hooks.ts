import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import addReply from './hooks';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [protect('password')],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [protect('by.password'), protect('replies[0].by.password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
