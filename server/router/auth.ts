import { API, ApiGetUser } from './../../share/RestAPI';
import * as express from 'express';
import AuthCtrl from '../controllers/authController';
import { HttpTypeDecorator } from '../utilities/server.helper';

export default function setRoutes(app) {
  const router = express.Router();
  app.use(router);

  const authCtrl = new AuthCtrl();

  // Cats
  router.route('/api/login').post(authCtrl.login);
  router.route('/api/posts/:id/comments').get(authCtrl.getComments);
  router.route('/api/user').post(authCtrl.insert);
  router
    .route('/api/user/emailpasswordreset/:email')
    .get(authCtrl.emailPasswordReset);

  router.route('/api/user/email/:email').get(authCtrl.emailExist);
  router.route('/api/user/username/:username').get(authCtrl.usernameExist);
  router.route('/api/user/password').put(authCtrl.updatePassword);
  router
    .route('/api/user/password/token/:token')
    .get(authCtrl.checkResetExpired);
  // router.get('/', authCtrl.authenticate, function(req, res) {
  //   res.status(201).json({ message: 'Welcome to the authenticated routes!' });
  // });
  router.use(authCtrl.authenticate);
  router.route('/api/users').get(authCtrl.getAll);
  router.route('/api/users/count').get(authCtrl.count);
  router
    .route(API.GetUser)
    .get((req, res) =>
      HttpTypeDecorator<ApiGetUser>(req, res, authCtrl.getWithToken)
    );
  router.route('/api/user/:id').get(authCtrl.get);
  router.route('/api/user/:id').put(authCtrl.update);
  router.route('/api/user/:id').delete(authCtrl.delete);
  router.route('/api/posts/:id/comments').post(authCtrl.addComment);
  // Apply the routes to our application with the prefix /api
}
