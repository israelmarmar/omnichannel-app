import express from 'express';
import { BASE_ENDPOINT } from './constants/endpoint';
import UsersController from './controllers/usersController';
import verifyToken from './utils/verifyToken';

const routes = express.Router();
const usersController = new UsersController();

routes.post(BASE_ENDPOINT + "/users", usersController.create);
routes.post(BASE_ENDPOINT + "/users/reset", usersController.requestReset);
routes.get("/users/passwordReset", usersController.resetForm);
routes.post("/users/passwordReset", usersController.resetPassword);
routes.post(BASE_ENDPOINT + "/users/login", usersController.login);
routes.get(BASE_ENDPOINT + "/users/me", verifyToken,  usersController.me);

export default routes;