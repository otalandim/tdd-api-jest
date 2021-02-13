exports.up = (knex) => {
  return knex.schema.createTable('accounts', (accounts) => {
    accounts.increments('id').primary(),
    accounts.string('name').notNull();
    accounts.integer('user_id')
      .references('id')
      .inTable('users')
      .notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('accounts');
};
