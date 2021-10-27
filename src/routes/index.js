const authRoutes = require('./auth');
const defaultRoutes = require('./default');

module.exports =(app)=> {
    app.use('/admin', authRoutes);
    app.use('/auth', defaultRoutes);
}   