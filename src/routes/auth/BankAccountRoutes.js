const { BankAccountController } = require('../../controllers');

function bankAccountRoutes(apiRouter) {
    //create
    apiRouter.route('/bank/create').post(BankAccountController.createAccount);
}
module.exports= bankAccountRoutes