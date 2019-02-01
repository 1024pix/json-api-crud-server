module.exports = {

  tableName: 'organizations',

  recordTypes: {
    // Attributes
    name: String,
    type: String,
    code: String,
    logoUrl: String,
    createdAt: Date,
    updatedAt: Date,

    // Relationships
    memberships: [Array('membership'), 'organization'],
  },

  hooks: [
    // Input
    (context, record, update) => {
      switch (context.request.method) {
        case 'create':
          const now = new Date();
          record.createdAt = now;
          record.updatedAt = now;
          return record;
        case 'update':
          record.updatedAt = new Date();
          return update;
        case 'delete':
          return null;
      }
    },

    // Output
  ],

};