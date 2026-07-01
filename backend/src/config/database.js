import { Sequelize } from "sequelize";
import env from "./env.js";

const sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: "postgres",
    logging: env.nodeEnv === "development" ? console.log : false,
  }
);

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database.");
    console.error(error.message);
    throw error;
  }
}

export async function synchronizeDatabase() {
  try {
    await sequelize.sync();

    console.log("Database tables synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize database tables.");
    console.error(error.message);

    throw error;
  }
}

export default sequelize;