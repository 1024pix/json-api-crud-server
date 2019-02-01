module.exports = {

  tableName: 'memberships',

  recordTypes: {
    // Attributes

    // Relationships
    organization: ['organization', 'memberships'],
    user: ['user', 'memberships'],
  },

  hooks: [
    // Input
    (context, record, update) => {
      switch (context.request.method) {
        case 'create':
          return record;
        case 'update':
          return record;
        case 'delete':
          return null;
      }
    },

    // Output
  ],

};