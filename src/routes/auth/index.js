
const express = require('express');

const authRouter = express.Router();
// const {
//     verifyToken,
//     verifyAcl,
// } = require('../../utils/common');

// authRouter.use(async (req, res, next) => {
//     await verifyToken(req, res, next);
// });
// /** check acl */
// authRouter.use(async (req, res, next) => {
//     await verifyAcl(req, res, next);
// });

require('./UserRoutes')(authRouter);

module.exports = authRouter;
