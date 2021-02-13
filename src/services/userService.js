module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const create = async (user) => {
    if (!user.name) return { message: 'Nome é um atributo obrigatório' };
    if (!user.mail) return { message: 'Email é um atributo obrigatório' };
    if (!user.password) return { message: 'Senha é um atributo obrigatório' };

    const userDd = await findAll({ mail: user.mail });
    if (userDd && userDd.length > 0) return { message: 'Já existe um usuário com esse email' };

    return app.db('users').insert(user, '*');
  };

  return { findAll, create };
};
