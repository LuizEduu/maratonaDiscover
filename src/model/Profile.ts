import ProfileService from '../services/ProfileService';

interface Profile {
  id?: string;
  name: string;
  avatar: string;
  monthly_budget: number;
  days_per_week: number;
  hours_per_day: number;
  vacation_per_year: number;
  value_hour: number;
  created_at?: Date;
}

export default {
  async get(): Promise<Profile[]> {
    return await ProfileService.get();
  },
  async update(profile: any) {
    await ProfileService.update(profile);
  },
};
