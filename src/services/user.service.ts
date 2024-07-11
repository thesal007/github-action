import { IUser, UserCreationParams } from "@/src/database/models/user.model";
import { getUserById, createUser, updateUser, deleteUser, getUsers } from "@/src/database/repositories/user.repositories";

export class UserService {

  public async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw new Error(`Failed to get user with id ${id}`);
    }
  } 

  public async createUser(params: UserCreationParams): Promise<IUser> {
    try {
      const newUser = await createUser(params);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  public async updateUser(id: string, params: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await updateUser(id, params);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(`Failed to update user with id ${id}`);
    }
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    try {
      const deletedUser = await deleteUser(id);
      return deletedUser;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw new Error(`Failed to delete user with id ${id}`);
    }
  }

  public async getUsers(): Promise<IUser[]> {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

}
