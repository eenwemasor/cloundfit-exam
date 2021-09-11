'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuestionOption.init({
    questionId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    isTheAnswer: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuestionOption',
  });
  return QuestionOption;
};