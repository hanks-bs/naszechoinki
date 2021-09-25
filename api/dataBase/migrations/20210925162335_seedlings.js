
exports.up = function(knex) {
    return knex.schema
    .createTable('seedlings' ,table => {
        table.increments('id');
        table.string('heading_pl').notNullable().unique();
        table.string('heading_en').notNullable().unique();
        table.string('description_pl').notNullable().unique();
        table.string('description_en').notNullable().unique();
      })
      .createTable('seedlings_items', table => {
        table.increments('id');
        table.string('title_pl').notNullable().unique();
        table.string('title_en').notNullable().unique();
        table.string('age').notNullable();
        table.string('price_pl').notNullable();
        table.string('price_en').notNullable();
        table.string('others_pl').notNullable();
        table.string('others_en').notNullable();
        table.string('image_link').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('seedlings')
    .dropTable('seedlings_items')
};
