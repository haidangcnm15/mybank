const authRoutes = require('./auth');
const defaultRoutes = require('./default');

module.exports =(app)=> {
    app.use('/', authRoutes);
    app.use('/', defaultRoutes);
}   