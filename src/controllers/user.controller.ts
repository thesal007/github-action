import { Controller, Route, Post, Get, Body, Path, Put, Delete,  } from 'tsoa';
import  {UserService}  from '@/src/services/user.service';
import { IUser, UserCreationParams } from '../database/models/user.model';

@Route("/v1/users")
export class UserController extends Controller {
  private userService: UserService = new UserService();

  @Get("{id}")
  public async getUserById(@Path() id: string): Promise<IUser | null> {
    return this.userService.getUserById(id);
  }


  @Post("/")
  public async createNewUser(@Body() requestBody: UserCreationParams): Promise<IUser> {
    return this.userService.createUser(requestBody);
  }

  @Put("{id}")
  public async updateUser(@Path() id:string, @Body() body: Partial<IUser>): Promise<IUser | null> {
    return this.userService.updateUser(id, body);
  }

  @Delete("{id}")
  public async deleteUser(@Path() id: string): Promise<IUser | null> {
    return this.userService.deleteUser(id);
  }
  @Get("/")
  public async getUser(): Promise<IUser[]>{
    return this.userService.getUsers();
  }
}
