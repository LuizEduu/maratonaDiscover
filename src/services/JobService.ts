import Database from '../db/config';

interface Request {
  id?: string;
  name: string;
  daily_hours: string;
  total_hours: string;
  created_at?: number;
}

export default {
  async get() {
    const db = await Database();

    const jobs = await db.all(`SELECT * FROM jobs`);

    db.close();

    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      daily_hours: job.daily_hours,
      total_hours: job.total_hours,
      created_at: job.created_at,
    }));
  },

  async create(job: Request) {
    const db = await Database();

    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${job.name}",
      ${job.daily_hours},
      ${job.total_hours},
      ${job.created_at}
    )
    
  `);
    await db.close();
  },

  async update(updatedJob: Request, jobId: number) {
    const db = await Database();

    db.run(`UPDATE jobs SET 
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob.daily_hours},
      total_hours = ${updatedJob.total_hours}
      WHERE id = ${jobId}
    `);

    await db.close();
  },

  async delete(jobId: number) {
    const db = await Database();

    db.run(`DELETE FROM jobs WHERE id = ${jobId}`);

    await db.close();
  },
};
