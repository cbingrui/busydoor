import * as express from 'express';
import AuthCtrl from '../controllers/authController';

export default function setRoutes(app) {

    const router = express.Router();

    const authCtrl = new AuthCtrl();

    // Cats
    router.route('/login').post(authCtrl.login);
    router.use(authCtrl.authenticate);
    router.route('/').get(function (req, res) {
        res.status(201).json({ message: 'Welcome to the authenticated routes!' });
    });
    router.route('/users').get(authCtrl.getAll);
    router.route('/users/count').get(authCtrl.count);
    router.route('/user').post(authCtrl.insert);
    router.route('/user/:id').get(authCtrl.get);
    router.route('/user/:id').put(authCtrl.update);
    router.route('/user/:id').delete(authCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);


}
