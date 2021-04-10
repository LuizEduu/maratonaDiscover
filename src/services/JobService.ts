import knex from '../database/connection';

interface Request {
  id?: string;
  name: string;
  daily_hours: string;
  total_hours: string;
  created_at?: number;
}

export default {
  async get() {
    const jobs = await knex('jobs').select('*');

    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      daily_hours: job.daily_hours,
      total_hours: job.total_hours,
      created_at: job.created_at,
    }));
  },

  async create(job: Request) {
    const saveJob = {
      ...job,
      created_at: Date.now(),
    };

    const trx = await knex.transaction();

    await trx('jobs').insert(saveJob);

    trx.commit();
  },

  async update(updatedJob: Request, jobId: number) {
    const trx = await knex.transaction();

    await trx('jobs').where('id', '=', jobId).update({
      name: updatedJob.name,
      daily_hours: updatedJob.daily_hours,
      total_hours: updatedJob.total_hours,
    });

    trx.commit();
  },

  async delete(jobId: string) {
    const trx = await knex.transaction();

    await trx('jobs').where('id', '=', jobId).delete();

    trx.commit();
  },
};
