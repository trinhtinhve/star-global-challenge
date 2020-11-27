const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./common/error')
const router = require('./web/router');

var app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler)

module.exports = app;
