import knex from '../database/connection';

export default {
  async get() {
    const data = await knex('profile').select('*');

    const serializedProfile = data.map((profile) => {
      return {
        name: profile.name,
        avatar: profile.avatar,
        monthly_budget: profile.monthly_budget,
        days_per_week: profile.days_per_week,
        hours_per_day: profile.hours_per_day,
        vacation_per_year: profile.vacation_per_year,
        value_hour: profile.value_hour,
      };
    });

    return serializedProfile;
  },

  async update(profile: any) {
    const clearSpacesName = profile.name.trim();

    const trx = await knex.transaction();

    const saveProfile = {
      name: clearSpacesName,
      avatar: profile.avatar,
      monthly_budget: profile['monthly-budget'],
      hours_per_day: profile['hours-per-day'],
      days_per_week: profile['days-per-week'],
      vacation_per_year: profile['vacation-per-year'],
      value_hour: profile.value_hou,
    };

    await trx('profile').update({ saveProfile });
  },
};
