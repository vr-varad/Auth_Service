'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'User_Roles'
      })
    }
  }
  User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,300]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async(user)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        console.error(err);
    }
  })
  return User;
};