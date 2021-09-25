
exports.up = function(knex) {
    return knex.schema
    .createTable('gallery' ,table => {
        table.increments('id');
        table.string('heading_pl').notNullable().unique();
        table.string('heading_en').notNullable().unique();
        table.string('description_pl').notNullable().unique();
        table.string('description_en').notNullable().unique();
      })
      .createTable('gallery_items', table => {
        table.increments('id');
        table.string('title_pl').notNullable();
        table.string('title_en').notNullable();
        table.string('description_pl');
        table.string('description_en');
      })
};

exports.down = function(knex) {
    return knex.schema
  .dropTable('gallery')
  .dropTable('gallery_items')
};
