exports.up = function (knex) {
  return knex.schema
    .createTable("gallery_items", (table) => {
      table.increments("id");
      table.string("title_pl").notNullable();
      table.string("title_en").notNullable();
      table.string("width").notNullable().defaultTo("1");
      table.string("height").notNullable().defaultTo("1");
      table.string("description_pl");
      table.string("description_en");
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
  .dropTable("gallery_items")
};
