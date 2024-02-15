const User = require('./User');
const Collection = require('./Collection')

// Creating a one to one between collection and user
User.hasOne(Collection, {
  foreignKey: 'user_id',
});
  
Collection.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Collection
};

