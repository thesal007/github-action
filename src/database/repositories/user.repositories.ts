
import User, { IUser } from '../models/user.model';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
// Function to get a user by ID
export async function getUserById(id: string): Promise<IUser | null> {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error(`Failed to get user with id ${id}`);
  }
}

// Function to create a new user
export async function createUser(data: IUser): Promise<IUser> {
  const newUser = new User(data);
  return newUser.save();
}

// Function to update a user by ID
export async function updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

// Function to delete a user by ID
export async function deleteUser(id: string): Promise<IUser | null> {
  return User.findByIdAndDelete(id);
}

// Function to get all users
export async function getUsers(): Promise<IUser[]> {
  return await User.find();
}

