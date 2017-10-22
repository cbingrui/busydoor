import * as jwt from 'jsonwebtoken';
import usermodel from './../models/user';
import BaseCtrl from './base';

export default class AuthCtrl extends BaseCtrl {

    model = usermodel;

    login = (req, res) => {

        this.model.findOne({ email: req.body.email }, (err, user) => {
            if (!user) { return res.sendStatus(403); }
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (!isMatch) { return res.sendStatus(403); }
                const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, { expiresIn: '24h' });
                res.status(200).json({ token: token });
            });
        });
    }
    authenticate = function (req, res, next) {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['authorization'];
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
                if (err) {
                    // tslint:disable-next-line:max-line-length
                    return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(201).json({
                success: false,
                message: 'Fatal error, Authenticate token not available.',
                errcode: 'no-token'
            });
        }
    };
}
