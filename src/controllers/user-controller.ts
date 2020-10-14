import { Request, Response } from "express";
import { User } from "@src/entities/user";
import { TokenService } from "@src/services/use-cases/token-service";
import { IUser } from "@src/repositories/interfaces/user";
import { UserRepository } from "@src/repositories/user-repository";

const userRepository:IUser = new UserRepository();

export class UserController {

  public static async create(req: Request, res: Response): Promise<void>{
    try {
      const user = new User(req.body);
      const newUser = await userRepository.save(user);
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }

  public static async login(req: Request, res: Response): Promise<void>{
    try {
      const user = await userRepository.findByEmail(req.body.email);
      if(!user) {
        res.status(401).send({code: 401, message: 'User not found'})
      }
      if(user?.password !== req.body.password) {
        res.status(401).send({code: 401, message: 'Passoword invalid'});
      }
      const userJson = JSON.parse(JSON.stringify(user));
      const token = TokenService.code(userJson);
      res.status(200).send({email: user?.email, token})
    } catch (error) {
      console.log(error);
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }


}