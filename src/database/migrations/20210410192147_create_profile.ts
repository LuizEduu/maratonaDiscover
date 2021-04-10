import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('profile', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.integer('monthly_budget').notNullable();
    table.integer('hours_per_day').notNullable();
    table.integer('days_per_week').notNullable();
    table.integer('vacation_per_year').notNullable();
    table.integer('value_hour').notNullable();
    table.dateTime('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('profile');
}
