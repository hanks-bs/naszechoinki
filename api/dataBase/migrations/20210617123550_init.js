
exports.up = (knex) => {
    return knex.schema
    .createTable('refreshTokens', table => {
      table.increments('id');
      table.string('token').notNullable().unique();
      table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now());

    })
    .createTable('users', table => {
        table.increments('id');
        table.string('username').notNullable().unique();
        table.string('password').notNullable()
        table.string('surname').notNullable();
        table.string('email').notNullable().unique();
        table.timestamps(true, true);
    })
}

exports.down = (knex) => {
  return knex.schema
  .dropTable('users')
  .dropTable('refreshTokens');
}
