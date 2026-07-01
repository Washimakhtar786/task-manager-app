import app from "./app.js";
import env from "./config/env.js";
import {
  connectDatabase,
  synchronizeDatabase,
} from "./config/database.js";

import "./domain/index.js";

async function startServer() {
  try {
    await connectDatabase();
    await synchronizeDatabase();

    app.listen(env.port, () => {
      console.log(`🚀 Server is running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Application startup failed.");
    process.exit(1);
  }
}

startServer();