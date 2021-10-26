const { TransactionController } = require('../../controllers');

function transactionRouter(apiRouter) {
    //create
    apiRouter.route('/transaction/create').post(TransactionController.createTransaction);
}
module.exports= transactionRouter