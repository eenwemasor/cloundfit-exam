"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      body: DataTypes.TEXT,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  Question.associate = (models) => {
    Question.belongsTo(models.Category, {
      foreignKey: {
        name:"CategoryId",
        allowNull: false,
      },
    });
    Question.hasMany(models.QuestionOption, {
      onDelete: "cascade",
      as:"options"
    });
  };
  return Question;
};
