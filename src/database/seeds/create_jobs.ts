import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('jobs').insert([
    {
      name: 'Pizarria guloso',
      daily_hours: 4,
      total_hours: 40,
      created_at: Date.now(),
    },

    {
      name: 'One Two Project',
      daily_hours: 2,
      total_hours: 16,
      created_at: Date.now(),
    },
  ]);
}
