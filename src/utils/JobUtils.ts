interface Job {
  id?: string;
  total_hours: number;
  daily_hours: number;
  created_at: Date;
}

export default {
  remainingDays(job: Job) {
    const remainingDays = (job.total_hours / job.daily_hours).toFixed();

    const createdJobDate = new Date(job.created_at); //data de criação do job
    const dueDay = createdJobDate.getDate() + Number(remainingDays); // getDate retorna o dia do mes de uma data, dia do vencimento do job
    const dueDateInMilliseconds = createdJobDate.setDate(dueDay); //data futura de vencimento

    const timeDiffInMilliseconds = dueDateInMilliseconds - Date.now();

    // transformar milli em dias
    const dayInMilliseconds = 1000 * 60 * 60 * 24; // converte milliseconds para um dia
    const dayDiff = Math.floor(timeDiffInMilliseconds / dayInMilliseconds); //math.ceil ficou dando bug nos status para mim, floor funcionou

    // restam x dias
    return dayDiff;
  },

  calculateBudget: (job: Job, valueHour: number) => valueHour * job.total_hours,
};
