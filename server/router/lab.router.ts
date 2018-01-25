import * as express from 'express';
import * as path from 'path';
export default function labRoutes(app) {
  const router = express.Router();
  app.use(router);

  // Cats
  router.route('/gallery').get(function(req, res, next) {
    if (req.subdomains.indexOf('lab') === -1) {
      next();
    } else {
      const PythonShell = require('python-shell');

      const options = {
        mode: 'json',
        // pythonPath: '/Users/ray/.pyenv/shims/python',
        pythonPath: '/usr/bin/python',
        scriptPath: __dirname,
        args: [req.query.page_index || '1']
      };

      PythonShell.run(path.join('../utilities/pixabay.py'), options, function(
        err,
        results
      ) {
        if (err) {
          throw err;
        }
        res.status(200).send(results[0]);
      });
    }
  });
}
