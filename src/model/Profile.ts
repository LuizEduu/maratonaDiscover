import ProfileService from '../services/ProfileService';

export default {
  async get() {
    return await ProfileService.get();
  },
  async update(profile: any) {
    await ProfileService.update(profile);
  },
};
