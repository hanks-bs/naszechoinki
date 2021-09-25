
exports.up = function(knex) {
    return knex.schema
    .createTable('pricelist' ,table => {
      table.increments('id');
      table.string('heading_pl').notNullable().unique();
      table.string('heading_en').notNullable().unique();
      table.string('description_pl').notNullable().unique();
      table.string('description_en').notNullable().unique();
    })
    .createTable('pricelist_items', table => {
      table.increments('id');
      table.string('title_pl').notNullable().unique();
      table.string('title_en').notNullable().unique();
      table.json('heights').notNullable();
      table.string('description_pl').notNullable();
      table.string('description_en').notNullable();
      table.string('additional_info_pl').notNullable();
      table.string('additional_info_en').notNullable();
    })
    .createTable('pricelist_files', table => {
      table.increments('id');
      table.string('heading_pl').notNullable();
      table.string('heading_en').notNullable();
      table.string('description_pl');
      table.string('description_en');
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTable('pricelist')
  .dropTable('pricelist_items')
  .dropTable('pricelist_files')
};
