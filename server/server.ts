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
import * as dotenv from 'dotenv';
const app = express();
dotenv.config({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParse());
app.use(logger('dev'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:4200'
}));

// init
const server = app.listen(config.port);
console.log(`server listening on ${config.port}`);

// router
router(app);
authRoute(app);

// export
export default server;
