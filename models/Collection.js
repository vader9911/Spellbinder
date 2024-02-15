const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collection extends Model{}

Collection.init(
   // TODO : define fields and columns for the cards 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primarykey: true
        },
        
        cards: {
            type: DataTypes.ARRAY 
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key:'id',
            },
        }
    },
    {
        // TODO : Link to database connection
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'Collection'
      }

);

module.exports = Collection;