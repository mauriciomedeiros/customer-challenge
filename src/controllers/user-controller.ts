import { Request, Response } from "express";
import { User } from "@src/entities/user";
import { TokenService } from "@src/services/use-cases/token-service";
import { IUser } from "@src/repositories/interfaces/user";
import { UserRepository } from "@src/repositories/user-repository";
import logger from "@src/config/logger";


const userRepository:IUser = new UserRepository();

export class UserController {

  public static async create(req: Request, res: Response): Promise<void>{
    try {
      const ifEmailRegisterd = await userRepository.findByEmail(req.body.email);
      if(ifEmailRegisterd) {
        res.status(400).send({code: 400, message: 'email already registered, email must be unique'})
      }
      const user = new User(req.body);
      const newUser = await userRepository.save(user);
      res.status(201).send(newUser);
    } catch (error) {
      logger.error('Error to create new user:', error)
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
      logger.error('Error trying to login:', error)
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }


}