import { Request, Response } from 'express';
import Job from '../model/Job';
import Profile from '../model/Profile';
import jobUtils from '../utils/JobUtils';

export default {
  create(req: Request, res: Response) {
    return res.render('job');
  },

  async save(req: Request, res: Response) {
    await Job.create({
      name: req.body.name,
      daily_hours: req.body['daily-hours'],
      total_hours: req.body['total-hours'],
    });

    return res.redirect('/');
  },

  async show(req: Request, res: Response) {
    const jobs = await Job.get();
    const jobId = req.params.id;

    const job = jobs?.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found!');
    }

    const profile = await Profile.get();

    const budget = jobUtils.calculateBudget(job, profile[0].value_hour);

    const jobEdit = {
      ...job,
      budget,
    };

    return res.render('job-edit', { job: jobEdit });
  },

  async update(req: Request, res: Response) {
    const jobId = req.params.id;

    if (!jobId) {
      return res.send('Job not found!');
    }

    if (
      !req.body.name ||
      !req.body['total-hours'] ||
      !req.body['daily-hours']
    ) {
      return res.send('data not found!');
    }

    const updatedJob = {
      name: req.body.name,
      total_hours: req.body['total-hours'],
      daily_hours: req.body['daily-hours'],
    };

    await Job.update(updatedJob, Number(jobId));

    return res.redirect('/');
  },

  async delete(req: Request, res: Response) {
    const jobId = req.params.id;

    if (!jobId) {
      return res.send('Job not found');
    }

    await Job.delete(jobId);

    return res.redirect('/');
  },
};
