exports.up = function (knex) {
  return knex.schema
    .createTable("gallery_items", (table) => {
      table.increments("id");
      table.string("title_pl");
      table.string("title_en");
      table.string("width").defaultTo("1");
      table.string("height").defaultTo("1");
      table.string("src").notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
  .dropTable("gallery_items")
};
