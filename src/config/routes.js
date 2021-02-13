module.exports = (app) => {
  app.route('/users')
    .get(app.controllers.userController.findAll)
    .post(app.controllers.userController.create);

  // app.route('/accounts')
  //   .get(app.controllers.accountController.getAll)
  //   .post(app.controllers.accountController.create);
//
  // app.route('/accounts/:id')
  //   .get(app.controllers.accountController.get);
};
