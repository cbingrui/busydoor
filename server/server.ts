import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParse from 'cookie-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import router from './router/post';
import authRoute from './router/auth';
import config from './config/database';
import { Server } from 'mongodb';

class ServerApp {
  private expressApp: express.Express;

  constructor() {
    this.initDB();
    this.initExpress();
  }

  private initDB() {
    mongoose.connect(config.MONGODB_URI);
  }

  private initExpress() {
    this.expressApp = express();
    this.initMiddleware(this.expressApp);
    this.initRouts(this.expressApp);
  }

  private initMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParse());
    app.use(logger('dev'));
    app.use(helmet());
    app.use(
      cors({
        origin: `http://${config.WEB_HOST}`
      })
    );
  }

  private initRouts(app) {
    router(app);
    authRoute(app);
  }

  public serverStart() {
    const server = this.expressApp.listen(config.port);
    console.log(`server listening on ${config.port}`);
  }
}

export default new ServerApp();
