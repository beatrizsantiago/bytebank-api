const { Router } = require('express');

const transactionsRouter = require('./transactions');
const dashboardRouter = require('./dashboard');
const usersRouter = require('./users');
const authRouter = require('./authentication');

const apiRouter = Router();

apiRouter.use('/autenticacao', authRouter);
apiRouter.use('/transacoes', transactionsRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/usuarios', usersRouter);

module.exports = apiRouter;
