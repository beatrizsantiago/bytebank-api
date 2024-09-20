const { Router } = require('express');

const transactionsRouter = require('./transactions');
const dashboardRouter = require('./dashboard');
const usersRouter = require('./users');

const apiRouter = Router();

apiRouter.use('/transacoes', transactionsRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/usuarios', usersRouter);

module.exports = apiRouter;
