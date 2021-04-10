import express from 'express';
import ProfileController from './controllers/ProfileController';
import JobController from './controllers/JobController';
import DashboardController from './controllers/DashboardController';

const routes = express.Router();

routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

export default routes;
