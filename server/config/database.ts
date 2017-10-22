const config = {
    port: process.env.PORT || 3000,
    MONGODB_URI: process.env.DOMAIN ? `mongodb://${process.env.DOMAIN}:27017/busydoor` : 'mongodb://localhost:27017/busydoor'
    , SECRET_TOKEN: 'zookeeper'
};

export default config;
