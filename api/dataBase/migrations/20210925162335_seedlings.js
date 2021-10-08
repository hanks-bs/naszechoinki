
exports.up = function(knex) {
    return knex.schema
      .createTable('seedlings_items', table => {
        table.increments('id');
        table.string('title_pl').notNullable().unique();
        table.string('title_en').notNullable().unique();
        table.string('age').notNullable();
        table.string('price_pl').notNullable();
        table.string('price_en').notNullable();
        table.string('others_pl');
        table.string('others_en');
        table.string('image_link').notNullable();
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('seedlings_items')
};
