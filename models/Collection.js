const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class collection extends Model{}

collection.init(
   // TODO : define fields and columns for the cards 
    {
        cards: {
        type: DataTypes.string 
        }
    },
    {
        // TODO : Link to database connection
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'card'
      }

);

module.exports = Card;