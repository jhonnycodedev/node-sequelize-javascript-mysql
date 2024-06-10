//models/BuySellDetails.js

const Sequelize = require('sequelize');

module.exports= (sequelize) => {
    
    const SellDetails = sequelize.define('SellDetails',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        quantidade:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        preco:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
     
    });

    SellDetails.associate = (models) =>{
        SellDetails.belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product'
        });
        
    };

    SellDetails.associate = (models) => {
        SellDetails.belongsTo(models.Sell, {
            foreignKey: 'sellId',
            as: 'Sell'
        });
    };

    return SellDetails;
};