import { Request, Response } from 'express';
import Profile from '../model/Profile';

export default {
  async index(req: Request, res: Response) {
    const profile = await Profile.get();
    return res.render('profile', { profile });
  },

  async update(req: Request, res: Response) {
    const data = req.body;
    console.log(data);
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = (data['value-hour'] =
      data['monthly-budget'] / monthlyTotalHours);

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      value_hour: valueHour,
    });

    res.redirect('/profile');
  },
};
