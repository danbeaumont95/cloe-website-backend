const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 1337;
const router = express.Router();
const { dbUri } = process.env;
const blogRoutes = require('./src/routes/blog');
const sessionRoutes = require('./src/routes/session');
const userRoutes = require('./src/routes/user');

mongoose.connect(dbUri, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors());
    app.options('*', cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // app.use(deserializeUser)

    app.use('/api', router);
    app.get('/info', async (req, res) => {
      res.send({ name: 'Cloe website API', version: '0.0.1 BETA' });
    });
    const server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server has started on ${port}!`);
    });
    router.use('/blog', blogRoutes);
    router.use('/session', sessionRoutes);
    router.use('/user', userRoutes);
  });
