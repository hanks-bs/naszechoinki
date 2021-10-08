
exports.up = function(knex) {
    return knex.schema
    .createTable("files_download", table => {
        table.increments("id");
        table.string("title_pl").notNullable();
        table.string("title_en").notNullable();
        table.string("path").notNullable();
        table.timestamps(true, true);

    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("files_download");
};
