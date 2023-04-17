require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT, MONGO_URL } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors);
app.disable('x-powered-by');

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
