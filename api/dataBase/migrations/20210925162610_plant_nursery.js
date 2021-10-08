
exports.up = function(knex) {
    return knex.schema
    .createTable('plant_nursery_items', table => {
      table.increments('id');
      table.string('title_pl').notNullable();
      table.string('title_en').notNullable();
      table.string('description_pl', 1000).notNullable();
      table.string('description_en', 1000).notNullable();
      table.string('image_link').notNullable();
      table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTable('plant_nursery_items')
};
