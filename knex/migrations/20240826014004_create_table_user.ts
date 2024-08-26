// import * as Knex from "knex";

export async function up(knex: any): Promise<void> {
    return await knex.schema.withSchema('public').createTable('users', function (table) {
        table.increments('id');
        table.string('username', 100).notNullable();
        table.string('password', 100).notNullable();
        table.string('name', 100).notNullable();
        table.string('email', 100).notNullable();
    });
}

export async function down(knex: any): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

