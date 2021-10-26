const { AuthController } = require('../../controllers');

function authRoutes(apiRouter) {
    //create
    apiRouter.route('/auth/login').post(AuthController.login);
}
module.exports= authRoutes