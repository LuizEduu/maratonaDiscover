import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('daily_hours').notNullable();
    table.integer('total_hours').notNullable();
    table.dateTime('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('jobs');
}
