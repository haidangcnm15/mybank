
const express = require('express');

const defaultRoutes = express.Router();
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

require('./auth')(defaultRoutes);

module.exports = defaultRoutes;
