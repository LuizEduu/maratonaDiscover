import JobService from '../services/JobService';

interface Job {
  id: string;
  name: string;
  daily_hours: number;
  total_hours: number;
  created_at: Date;
}

export default {
  async get(): Promise<Job[] | null> {
    return await JobService.get();
  },

  async create(job: any) {
    await JobService.create(job);
  },

  async update(updatedJob: any, jobId: number) {
    await JobService.update(updatedJob, jobId);
  },

  async delete(jobId: string) {
    await JobService.delete(jobId);
  },
};
