import { Sequelize, Model, DataTypes } from "sequelize";

const Universities = (sequelize) => {
  return sequelize.define("universities", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    university_id: DataTypes.STRING,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    logo: DataTypes.STRING,
  });
};

export default Universities;
