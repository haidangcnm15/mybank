
const {signToken,verifyToken,
     responseSuccess,responseError} = require('../utils');
const {UserServices} = require('../services');

async function login(request, response, next) {
    try {
        const { username, password } = request.body;
        let user = await UserServices.findByUsername(username);
    if (user && user.isDeleted == false ) {
        if (password === user.password) {
            const data = {
                _id: user._id,
                username: username,
                loggedAt: Date.now()
            }
            const result = signToken(data);
            if(result){
                const dataResponse = {
                    ...data,
                    token:result
                }
                return response.json(responseSuccess(1300, dataResponse));
            }
            return response.json(responseError(9000, null));
        } else {
            return response.json(responseError(2003, null));
        }
    } else {
        return response.json(responseError(2003, null));
    }
    } catch (error) {
        return response.json(responseError(9000, null));
    }
};

async function checkAuth(request, response, next) {
    const token = request.header("access-token");
    if (token) {
        try {
            const data = await verifyToken(token);
            if (!data) {
                return response.json(responseError(2300, null));
            }
            request.user = data;
            next();
        } catch (error) {
            return response.json(responseError(9000, null));
        }
    } else {
        return response.json(responseError(2300, null));
    }
};

module.exports={
    login,checkAuth
}