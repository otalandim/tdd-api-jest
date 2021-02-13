module.exports = (app) => {
  const create = (req, res) => {
    app.services.accountService.save(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      });
  };

  const getAll = (req, res) => {
    app.services.accountService.findAll()
      .then((result) => res.status(200).json(result));
  };

  const get = (req, res) => {
    app.services.accountService.find({ id: req.params.id })
      .then((result) => res.status(200).json(result));
  };

  return { create, getAll, get };
};
