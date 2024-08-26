import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.withSchema('public').createTable('users', function (table) {
        table.increments('id');
        table.string('username', 50).notNullable();
        table.string('password', 50).notNullable();
        table.string('name', 50).notNullable();
        table.string('email', 50).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

