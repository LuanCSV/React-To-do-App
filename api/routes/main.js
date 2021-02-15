module.exports = (app) => {

    app.get('/', (req, res) => {
        res.json({ message: "Mensagem" })
    });
    app.use('/users', require('./public/users'));

    app.use('/', require('../middlewares/jwtValidation'));
    app.use('/tasks', require('./private/todos'));

}