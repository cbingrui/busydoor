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
import { ConsoleError } from './utilities/server.helper';

class ServerApp {
  private expressApp: express.Express;

  constructor() {
    this.initDB();
    this.initExpress();
  }

  private initDB() {
    const options = {
      authSource: 'admin',
      useMongoClient: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
    };
    mongoose
      .connect(config.MONGODB_URI, options)
      .then(() => console.log('Connected to the database'))
      .catch(err => ConsoleError(err));
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
