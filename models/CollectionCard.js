const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CollectionCard extends Model {}

CollectionCard.init(
   {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        condition:{
            type: DataTypes.STRING
        },

        collection_id:{
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
        modelName: 'collectionCard'
    }
);

module.exports = CollectionCard;