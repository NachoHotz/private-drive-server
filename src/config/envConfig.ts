export const envConfig = () => ({
  API_PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_DEV_URI: process.env.MONGO_DEV_URI,
  MONGO_PROD_URI: process.env.MONGO_PROD_URI,
  CLIENT_DEV_URL: process.env.CLIENT_DEV_URL,
  CLIENT_PROD_URL: process.env.CLIENT_PROD_URL
});
