import Database from '../db/config';

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
  async update(profile: any) {
    const clearSpacesName = profile.name.trim();
    const db = await Database();

    db.run(`UPDATE profile SET 
    name = "${clearSpacesName}",
    avatar = "${profile.avatar}",
    monthly_budget = ${profile['monthly-budget']},
    hours_per_day = ${profile['hours-per-day']},
    days_per_week = ${profile['days-per-week']},
    vacation_per_year = ${profile['vacation-per-year']},
    value_hour = ${profile.value_hour}
    `);
    await db.close();
  },
};
