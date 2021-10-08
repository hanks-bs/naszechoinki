
exports.up = function(knex) {
    return knex.schema
    .createTable('pricelist_items', table => {
      table.increments('id');
      table.string('title_pl').notNullable().unique();
      table.string('title_en').notNullable().unique();
      table.string('heights').notNullable();
      table.string('description_pl').notNullable();
      table.string('description_en').notNullable();
      table.string('additional_info_pl');
      table.string('additional_info_en');
      table.string('image_link').notNullable();
      table.timestamps(true, true);
    })

};

exports.down = function(knex) {
    return knex.schema
  .dropTable('pricelist_items')
};
