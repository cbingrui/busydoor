import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParse from 'cookie-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import router from './router/v1';
import authRoute from './router/auth';
import config from './config/database';
const app = express();
mongoose.connect(config.MONGODB_URI);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParse());
app.use(logger('dev'));
app.use(helmet());
app.use(cors({
    origin: `http://${config.WEB_HOST}`
}));

// init
const server = app.listen(config.port);
console.log(`server listening on ${config.port}`);

// router
router(app);
authRoute(app);

// export
export default server;
