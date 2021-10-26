const { UserServices} = require('../services');
const {
    validateUser,
} = require('../validator');
const {
    responseError,
    responseSuccess,
    trimValue,isEmpty,
} = require('../utils');

const {createValidator,updateValidator,deleteValidator} = validateUser;

async function createUser(request, response, next) {
    try {
        console.log('request',request?.body)
        request.checkBody(createValidator);
        const errors = request.validationErrors();
        console.log({errors})
        if (errors) {
            return response.json(responseError(9009, errors));
        }
        const {body} = request;
        const isExistUN = await UserServices.findByUsername(body?.username)
        console.log({isExistUN})
        if(isExistUN){
            return response.json(responseError(2002, null));
        }
        const params = {
            name:body?.name,
            dob:body?.dob,
            sex:body?.sex,
            phone:body?.phone,
            address:body?.address,
            idCard:body?.idCard,
            note: body?.note,
            username: body?.username,
            password:body?.password
        }
        console.log({params})
        const result = await UserServices.create(params);
        if (!isEmpty(result)) {
            return response.json(responseSuccess(1000, result));
        }
        return response.json(responseError(9001, null));
    } catch (error) {
        console.log({error})
        return response.json(responseError(9000, null));
    }
};

module.exports={
    createUser,
}