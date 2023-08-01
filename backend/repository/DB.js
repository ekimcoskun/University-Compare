import { Sequelize } from "sequelize";
import "dotenv/config";
import Users from "../models/Users.js";
import Universities from "../models/Universities.js";
import Reviews from "../models/Reviews.js";
class Database {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

    this.Users = Users(this.sequelize);
    this.Universities = Universities(this.sequelize);
    this.Reviews = Reviews(this.sequelize);

    this.Reviews.belongsTo(this.Users, {
      foreignKey: "user_id",
    });
    this.Users.hasMany(this.Reviews, {
      foreignKey: "user_id",
    });

    this.Reviews.belongsTo(this.Universities, {
      foreignKey: "university_id",
    });
    this.Universities.hasOne(this.Reviews, {
      foreignKey: "university_id",
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await this.sequelize.sync(/* { force: true } */);
      console.log("Models have been synchronized successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  async close() {
    try {
      await this.sequelize.close();
      console.log("Connection has been closed successfully.");
    } catch (error) {
      console.error("Unable to close the database connection:", error);
    }
  }
}

export const Methods = {
  create: async function (model, data) {
    const new_data = await model.create(data);
    return new_data;
  },

  delete: async function (model, data) {
    const create = await model.create(data);
    await create.destroy();
  },
  list: async function (model) {
    // TODO : WHERE ve SELECT eklenecek
    const listData = await model.findAll();
    return listData;
  },
  update: async function (model, data, where) {
    try {
      await model.update(data, { where: where });
    } catch (err) {
      console.log(err);
    }
  },
  findOne: async function (model, where = {}, select = {}) {
    try {
      console.log("MODEL***: ", model);
      if (where?.store_url) {
        const domain = where?.store_url;
        console.log("DOMAIN: ", domain);
        if (domain) {
          const splitted = domain.split(".");

          const newsplitted = splitted.filter((item) => {
            if (item !== "myshopify") {
              return item;
            }
          });
          const newDomain = newsplitted.join(".");
          console.log("NEW DOMAIN: ", newDomain);
          let listData = await model.findOne({ where: { store_url: newDomain } });
          console.log("LIST DATA: ", listData);
          if (!listData) {
            listData = await model.findOne({ where: { store_url: domain } });
          }
          return listData;
        }
        const listData = await model.findOne({ where: where });
        return listData;
      } else {
        const listData = await model.findOne({ where: where });
        return listData;
      }
    } catch (err) {
      console.log(err);
    }
  },
  findAll: async function (model, where = {}) {
    // TODO : WHERE ve SELECT eklenecek
    const listData = await model.findAll({ where: where });
    return listData;
  },
};

const DB = new Database();

export default DB;
