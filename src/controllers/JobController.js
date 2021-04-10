const Job = require('../model/Job');
const Profile = require('../model/Profile');
const jobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render('job');
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now(),
    });

    return res.redirect('/');
  },

  async show(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found!');
    }

    const profile = await Profile.get()

    job.budget = jobUtils.calculateBudget(job, profile['value-hour']);

    return res.render('job-edit', { job });
  },

  async update(req, res) {
    const jobId = req.params.id;
    let job = await Job.get();


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
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }


    await Job.update(updatedJob, jobId)

    return res.redirect('/');
  },

  async delete(req, res) {
    const jobId = req.params.id;

    if (!jobId) {
      return res.send('Job not found');
    }

    await Job.delete(jobId);

    return res.redirect('/');
  },
};
