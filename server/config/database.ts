const config = {
  port: process.env.SERVER_PORT || 3000,
  MONGODB_URI: process.env.DB_HOST
    ? `mongodb://${process.env.DB_HOST}:27017/busydoor`
    : 'mongodb://localhost:27017/busydoor',
  SECRET_TOKEN: 'zookeeper',
  WEB_HOST: process.env.WEB_HOST || 'localhost:4200',
  PRODUCTION: process.env.PRODUCTION || false
};

export default config;
