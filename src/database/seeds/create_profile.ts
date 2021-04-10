import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('profile').insert([
    {
      name: 'Luiz Eduardo',
      avatar: 'https://github.com/luizeduu.png',
      monthly_budget: 5000,
      days_per_week: 5,
      hours_per_day: 8,
      vacation_per_year: 4,
      value_hour: 40,
      created_at: Date.now(),
    },
  ]);
}
