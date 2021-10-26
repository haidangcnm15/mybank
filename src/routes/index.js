const authRoutes = require('./auth');

module.exports =(app)=> {
    app.use('/', authRoutes);
}   