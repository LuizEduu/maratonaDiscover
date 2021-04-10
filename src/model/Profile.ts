import Database from '../db/config';

interface Request {
  name: string;
  avatar: string;
  monthly_budget: string;
  days_per_week: string;
  hours_per_day: string;
  vacation_per_year: string;
  value_hour: string;
}

export default {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      monthly_budget: data.monthly_budget,
      days_per_week: data.days_per_week,
      hours_per_day: data.hours_per_day,
      vacation_per_year: data.vacation_per_year,
      value_hour: data.value_hour,
    };
  },
  async update(profile: Request) {
    const db = await Database();

    db.run(`UPDATE profile SET 
    name = "${profile.name}",
    avatar = "${profile.avatar}",
    monthly_budget = ${profile.monthly_budget},
    days_per_week = ${profile.days_per_week},
    hours_per_day = ${profile.hours_per_day},
    vacation_per_year = ${profile.vacation_per_year},
    value_hour = ${profile.value_hour}
    `);

    await db.close();
  },
};
