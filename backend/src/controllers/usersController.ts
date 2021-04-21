import { Request, Response } from 'express';
import { User } from '../app/db/models/users';

class UsersController {
  async create(req: Request, res: Response) {

    const existUser = await User.findOne({email: req.body.email});

    if(existUser)
      return res.status(400).send({
        message: 'usuário já cadastrado'
      });

    try{
    const newUser = new User({
      'email': req.body.email,
      'name': req.body.name,
      'address': req.body.address,
    });
    let saveUser = await newUser.save();
    res.json(saveUser);
    }catch(err){
      console.log(err);
      res.json(err);
    }
  }

}

export default UsersController;