import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import User from './../models/User';
import BaseCtrl from './base';
export default class AuthCtrl extends BaseCtrl {

    model = User;

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
}
