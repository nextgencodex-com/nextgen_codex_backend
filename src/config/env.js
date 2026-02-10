const envConfig = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "nextgen_codex_db",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default envConfig;
