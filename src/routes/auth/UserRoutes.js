const { UserController } = require('../../controllers');

function userRoutes(apiRouter) {
    //create
    apiRouter.route('/user/create').post(UserController.createUser);
}
module.exports= userRoutes