import * as express from 'express';
import AuthCtrl from '../controllers/authController';

export default function setRoutes(app) {
  const router = express.Router();
  app.use('/api', router);

  const authCtrl = new AuthCtrl();

  // Cats
  router.route('/login').post(authCtrl.login);
  router.route('/posts/:id/comments').get(authCtrl.getComments);
  router.route('/user').post(authCtrl.insert);

  router.route('/user/email/:email').get(authCtrl.emailExist);
  router.route('/user/username/:username').get(authCtrl.usernameExist);
  // router.get('/', authCtrl.authenticate, function(req, res) {
  //   res.status(201).json({ message: 'Welcome to the authenticated routes!' });
  // });
  router.use(authCtrl.authenticate);
  router.route('/users').get(authCtrl.getAll);
  router.route('/users/count').get(authCtrl.count);
  router.route('/user').get(authCtrl.getWithToken);
  router.route('/user/:id').get(authCtrl.get);
  router.route('/user/:id').put(authCtrl.update);
  router.route('/user/:id').delete(authCtrl.delete);
  router.route('/posts/:id/comments').post(authCtrl.addComment);
  // Apply the routes to our application with the prefix /api
}
