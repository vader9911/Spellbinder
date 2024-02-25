const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Collection extends Model {}

Collection.init(
    // TODO : define fields and columns for the cards 
    
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },

        },
    },
    {
        // TODO : Link to database connection
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'collection'
    }
);


module.exports = Collection;