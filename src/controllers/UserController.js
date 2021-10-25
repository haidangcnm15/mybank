const { UserServices} = require('../services');
const {
    validateUser,
} = require('../validator');
const {
    responseError,
    responseSuccess,
    trimValue,
} = require('../utils');

const {createValidator,updateValidator,deleteValidator} = validateUser;

async function createUser(request, response, next) {
    try {
        console.log('request',request?.body)
        // request.checkBody(createValidator);
        // const errors = request.validationErrors();
        // if (errors) {
        //     return response.json(responseError(9009, errors));
        // }
        const {body} = request;
        const params = {
            fullName:body?.fullName,
            dob:body?.dob,
            sex:body?.sex,
            phoneNumber:body?.phoneNumber,
            address:body?.address,
            idCard:body?.idCard,
            note:body?.note,
        }
        console.log({params})
        const result = await UserServices.create(params);
        if (!isEmpty(result)) {
            return response.json(responseSuccess(1000, result));
        }
        return response.json(responseError(9001, null));
    } catch (error) {
        return response.json(responseError(9000, null));
    }
};

module.exports={
    createUser,
}