const Database = require('../db/config');

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      'monthly-budget': data.monthly_budget,
      'days-per-week': data.days_per_week,
      'hours-per-day': data.hours_per_day,
      'vacation-per-year': data.vacation_per_year,
      'value-hour': data.value_hour,
    };
  },
  async update(profile) {
    const db = await Database();

    db.run(`UPDATE profile SET 
    name = "${profile.name}",
    avatar = "${profile.avatar}",
    monthly_budget = ${profile['monthly-budget']},
    days_per_week = ${profile['days-per-week']},
    hours_per_day = ${profile['hours-per-day']},
    vacation_per_year = ${profile['vacation-per-year']},
    value_hour = ${profile['value-hour']}
    `);

    await db.close();
  },
};
