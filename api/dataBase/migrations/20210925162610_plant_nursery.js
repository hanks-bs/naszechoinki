
exports.up = function(knex) {
    return knex.schema

    .createTable('plant_nursery' ,table => {
      table.increments('id');
      table.string('heading_pl').notNullable().unique();
      table.string('heading_en').notNullable().unique();
      table.string('description_pl').notNullable().unique();
      table.string('description_en').notNullable().unique();
    })
    .createTable('plant_nursery_items', table => {
      table.increments('id');
      table.string('heading_pl').notNullable();
      table.string('heading_en').notNullable();
      table.string('description_pl').notNullable();
      table.string('description_en').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTable('plant_nursery')
  .dropTable('plant_nursery_items')
};
