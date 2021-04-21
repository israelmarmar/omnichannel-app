import express from 'express';
import { BASE_ENDPOINT } from './constants/endpoint';
import UsersController from './controllers/usersController';

const routes = express.Router();
const usersController = new UsersController();

routes.post(BASE_ENDPOINT + "/users", usersController.create);

export default routes;