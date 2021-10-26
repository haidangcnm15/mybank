
const express = require('express');

const authRouter = express.Router();

const {
    AuthController
} = require('../../controllers');

authRouter.use(async (req, res, next) => {
    await AuthController.checkAuth(req, res, next);
});

// /** check acl */
// authRouter.use(async (req, res, next) => {
//     await verifyAcl(req, res, next);
// });

require('./UserRoutes')(authRouter);
require('./BankAccountRoutes')(authRouter);
require('./TransactionRoutes')(authRouter);

module.exports = authRouter;
