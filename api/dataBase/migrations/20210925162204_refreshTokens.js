
exports.up = function(knex) {
    return knex.schema
    .createTable('refreshTokens', table => {
      table.increments('id');
      table.string('token').notNullable().unique();
      table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now());

    })

};

exports.down = function(knex) {
    return knex.schema
    .dropTable('refreshTokens')
};
