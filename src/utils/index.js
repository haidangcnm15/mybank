const shared = require('./shared');
const {signToken,verifyToken} = require('./jwt');
const validate = require('./validate');

module.exports={
    ...shared,
    ...validate,
     verifyToken,signToken,
}