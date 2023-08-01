import { Sequelize, Model, DataTypes } from "sequelize";

const Users = (sequelize) => {
  return sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    role: DataTypes.STRING,
    university_id: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
  });
};

export default Users;
