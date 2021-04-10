module.exports = {
  remainingDays(job) {
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();

    const createdJobDate = new Date(job.created_at); //data de criação do job
    const dueDay = createdJobDate.getDate() + Number(remainingDays); // getDate retorna o dia do mes de uma data, dia do vencimento do job
    const dueDateInMilliseconds = createdJobDate.setDate(dueDay); //data futura de vencimento

    const timeDiffInMilliseconds = dueDateInMilliseconds - Date.now();

    // transformar milli em dias
    const dayInMilliseconds = 1000 * 60 * 60 * 24; // converte milliseconds para um dia
    const dayDiff = Math.ceil(timeDiffInMilliseconds / dayInMilliseconds);

    // restam x dias
    return dayDiff;
  },

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}