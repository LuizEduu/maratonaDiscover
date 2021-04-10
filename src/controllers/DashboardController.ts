import { Request, Response } from 'express';

import Job from '../model/Job';
import Profile from '../model/Profile';
import jobUtils from '../utils/JobUtils';

export default {
  async index(req: Request, res: Response) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;

    const updatedJob = jobs.map((job) => {
      const remaining = jobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      statusCount[status] += 1;

      jobTotalHours =
        status === 'progress'
          ? (jobTotalHours += Number(job.daily_hours))
          : jobTotalHours;

      return {
        ...job, // pegando tudo que tem no job e colocando pra esse objeto novo
        remaining,
        status,
        budget: jobUtils.calculateBudget(job, profile.value_hour),
      };
    });

    // qtd de horas que quero trabalhar - qtd de horas/dia de cada job em progress
    const freeHours = profile.hours_per_day - jobTotalHours;

    return res.render('index', {
      statusCount,
      profile,
      jobs: updatedJob,
      freeHours,
    });
  },
};
