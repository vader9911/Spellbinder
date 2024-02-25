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

        
        card_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        scryfall_id:{
            type: DataTypes.UUID,
            //defaultValue: UUIDV4,
        },

        img_uri:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        oracle_text:{
            type: DataTypes.TEXT
        },

        multifaced:{
            type: DataTypes.BOOLEAN
        },

        rarity:{
            type: DataTypes.STRING
        },

        card_price: {
            type: DataTypes.STRING,
            allowNull: true,
            //default null?
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