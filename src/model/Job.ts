import JobService from '../services/JobService';

export default {
  async get() {
    return await JobService.get();
  },

  async create(job: any) {
    await JobService.create(job);
  },

  async update(updatedJob: any, jobId: number) {
    await JobService.update(updatedJob, jobId);
  },

  async delete(jobId: number) {
    await JobService.delete(jobId);
  },
};
