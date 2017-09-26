import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParse from 'cookie-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import router from './router/v1';
import config from './config/database';

const app = express();

mongoose.connect(config.db);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParse());
app.use(logger());
app.use(helmet());
app.use(cors());

// init
const server = app.listen(config.port);
console.log(`server listening on ${config.port}`);

// router
router(app);

// export 
export default server;