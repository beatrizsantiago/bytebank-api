const { Router } = require('express');

const transactionsRouter = require('./transactions');
const usersRouter = require('./users');

const apiRouter = Router();

apiRouter.use('/transacoes', transactionsRouter);
apiRouter.use('/usuarios', usersRouter);

module.exports = apiRouter;
