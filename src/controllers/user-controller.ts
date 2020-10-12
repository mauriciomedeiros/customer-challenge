import { Request, Response } from "express";
import { User } from "@src/entities/user";
import { TokenService } from "@src/services/use-cases/token-service";

export class UserController {

  public static async create(req: Request, res: Response): Promise<void>{
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }

  public static async login(req: Request, res: Response): Promise<void>{
    try {
      const user = await User.findOne({email: req.body.email});
      if(!user) {
        res.status(401).send({code: 401, message: 'User not found'})
      }
      if(user?.password !== req.body.password) {
        res.status(401).send({code: 401, message: 'Passoword invalid'});
      }

      const token = TokenService.code(user?.toJSON());
      res.status(200).send({email: user?.email, token})
    } catch (error) {
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }


}