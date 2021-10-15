
exports.up = function(knex) {
    return knex.schema
    .createTable("files_download", table => {
        table.increments("id");
        table.string("title_pl");
        table.string("title_en");
        table.string("src").notNullable();
        table.string("alt").notNullable();
        table.timestamps(true, true);

    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("files_download");
};
