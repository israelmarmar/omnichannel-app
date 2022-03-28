require("dotenv").config();
import { Request, Response } from 'express';
import { User } from '../app/db/models/users';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';

interface RequestWithToken extends Request{
  token?: string,
  password?: string
}

interface RequestWithUser extends Request{
  userId?: string,
}

class UsersController {
  async me(req: RequestWithUser, res: Response) {
    const user = await User.findOne({ _id: req.userId });
    if (!user)
      return res.status(400).send({
        message: 'usuário não cadastrado'
    });

    return res.json({user});

  }

  async create(req: Request, res: Response) {
    let resetToken = crypto.randomBytes(32).toString("hex");
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser)
      return res.status(400).send({
        message: 'usuário já cadastrado'
      });

    try {
      const newUser = new User({
        'email': req.body.email,
        'name': req.body.name,
        'address': req.body.address,
        'token': resetToken,
        'resetPasswordExpires': Date.now() + 3600000,
      });
      let saveUser = await newUser.save();
      const link = `${process.env.CLIENT_URL}/users/passwordReset?token=${resetToken}&id=${saveUser._id}`;
      sendEmail(req.body.email,'definição de senha',{name: req.body.name, link},'template/requestResetPassword.handlebars')
      return res.json({ link });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }

  async login(req: Request, res: Response) {
    console.log(req.body);
    
    const user = await User.findOne({
      email: req.body.email
    });

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: 86400 // 24 hours
    });

    res.json({token});
  }

  async requestReset(req: Request, res: Response) {
    let resetToken = crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({
        message: 'usuário não cadastrado'
      });

    await User.updateOne({
      email: req.body.email
    }, {
      token: resetToken,
      resetPasswordExpires: Date.now() + 3600000,
      createdAt: Date.now(),
    }, { upsert: true });

    const link = `${process.env.CLIENT_URL}/users/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email, "Password Reset Request", { name: user.name, link: link, }, "./template/requestResetPassword.handlebars");
    return res.json({ link });
  }

  async resetForm(req: Request, res: Response){
    User.findOne({ token: req.query.token, resetPasswordExpires: { $gt: Date.now() } }, (err: any, user: any) => {
      if (!user) {
        res.send('Password reset token is invalid or has expired.');
      }
      res.render('resetPasswordForm', {token: req.query.token, layout: false});
    });
  }

  async resetPassword(req: RequestWithToken, res: Response){

    User.findOne({ resetPasswordToken: req.token, resetPasswordExpires: { $gt: Date.now() } }, function(err: any, user: any) {
      if (!user) {
        return res.send('Password reset token is invalid or has expired.');
      }

      user.token = undefined;
      user.resetPasswordExpires = undefined;

      console.log('password',req.body.password);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          user.password = hash;
          user.save((err: any) => {
            res.send('<h3>Senha alterado com sucesso</h3>');
          });
        });
      });

    });
  }

}

export default UsersController;