const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CollectionCard extends Model {}

//each row is an instance of a card belonging to a collection
CollectionCard.init(
   {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        card_name: {
            type: DataTypes.STRING,
            
        },

        condition:{
            type: DataTypes.STRING
        },

        collection_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'collection',
              key: 'id',
            },
        },
        card_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'card',
                key: 'id',
            },

        },
    },
    
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'collection_card'
    }
);

module.exports = CollectionCard;