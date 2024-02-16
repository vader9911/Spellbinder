const User = require('./User');
const Collection = require('./Collection');
const Card = require('./Card');
const CollectionCard = require ('./CollectionCard');

// Creating a one to one between collection and user
User.hasOne(Collection, {
  foreignKey: 'user_id',
});
  
Collection.belongsTo(User, {
  foreignKey: 'user_id',
});

//Create a many to many between collection and card
Collection.belongsToMany(Card, {
  foreignKey: 'collection_id',
});

Card.hasMany(Collection, {
  foreignKey: 'card_id',
});


module.exports = {
  User,
  Collection,
  CollectionCard
};

