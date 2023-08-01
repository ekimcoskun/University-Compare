import { Sequelize, Model, DataTypes } from "sequelize";

const Reviews = (sequelize) => {
  return sequelize.define("reviews", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    university_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
  });
};

export default Reviews;
