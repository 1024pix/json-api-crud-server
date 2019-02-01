const path = require('path');
const fs = require('fs');
const { camelCase } = require('lodash');

// Models config

const modelsConfig = {
  typeMap: {},
  recordTypes: {},
  hooks: {}
};

const modelsDirectory = path.join(__dirname, 'models');

fs.readdirSync(modelsDirectory).forEach((file) => {
  if (file === 'index.js') return;

  const model = require(path.join(modelsDirectory, file));
  const modelName = camelCase(path.basename(file, '.js'));

  if (model.tableName) {
    modelsConfig.typeMap[modelName] = model.tableName;
  }

  if (model.recordTypes) {
    modelsConfig.recordTypes[modelName] = model.recordTypes;
  }

  if (model.hooks) {
    modelsConfig.hooks[modelName] = model.hooks;
  }

});

// Server options

const options = {
  recordTypes: modelsConfig.recordTypes,
  hooks: modelsConfig.hooks,
};

// Configure a PostgreSQL if needed

if (process.env.DATABASE_URL) {
  options.adapter = [
    require('fortune-postgres'),
    {
      url: process.env.DATABASE_URL,
      typeMap: modelsConfig.typeMap,
      primaryKeyType: Number,
      generatePrimaryKey: null
    }
  ];
}

module.exports = options;
