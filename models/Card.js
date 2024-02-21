const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        scryfall_id:{
            type: DataTypes.UUID,
            //defaultValue: UUIDV4,
        },

        oracle_text:{
            type: DataTypes.STRING
        },

        multifaced:{
            type: DataTypes.BOOLEAN
        },

        rarity:{
            type: DataTypes.STRING
        }

    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'card',
    }
);

module.exports = Card;