'use strict';

// Initializes the `questions` service on path `/questions`
const createService = require('feathers-mongodb');
const hooks = require('./questions.hooks');
const filters = require('./questions.filters');

module.exports = function () {
  const app = this;
  const paginate = { default: 500, max: 1000 };
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/questions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('questions');

  mongoClient.then(db => {
    service.Model = db.collection('questions');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
