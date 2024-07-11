
import { mockRequest, mockRespone, myRouteHandler } from "../_mocks_";
import User, { IUser } from "../database/models/user.model";
import { deleteUser, getUserById, getUsers, updateUser } from "../database/repositories/user.repositories";
jest.mock('../database/models/user.model');

describe('getUsers', () => {
  const mockedUser = User as jest.Mocked<typeof User>;

  it('should return an array of users', async () => {
    const mockUsers = [
      {
        id: 'user-id-1',
        name: 'John Doe',
        age: 30,
        gender: 'male',
        category: 'admin',
        email: 'john@example.com',
      },
      {
        _id: 'user-id-2',
        name: 'Jane Smith',
        age: 25,
        gender: 'female',
        category: 'user',
        email: 'jane@example.com',
      }
    ] as IUser[];

    mockedUser.find.mockResolvedValue(mockUsers);

    const users = await getUsers();

    expect(users).toEqual(mockUsers);
    expect(mockedUser.find).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if no users are found', async () => {
    mockedUser.find.mockResolvedValue([]);

    const users = await getUsers();

    expect(users).toEqual([]);
    expect(mockedUser.find).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if find fails', async () => {
    mockedUser.find.mockRejectedValue(new Error('Database error'));

    await expect(getUsers()).rejects.toThrow('Database error');
    expect(mockedUser.find).toHaveBeenCalledTimes(3);
  });
});
// Example Jest test
test('myRouteHandler sends "Hello, World!"', () => {
  myRouteHandler(mockRequest, mockRespone);

  // Assert that send function was called with 'Hello, World!'
  expect(mockRespone.send).toHaveBeenCalledWith('Visal123');
});

describe('getUserById', () => {
  const mockUser: IUser = {
    id: '1',
    name: 'John Doe',
    age: 30,
    gender: 'male',
    category: 'A',
    email: 'johndoe@example.com',
  };

  it('should return a user when found', async () => {
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const user = await getUserById('1');
    expect(user).toEqual(mockUser);
  });
  it('should return null when user is not found', async () => {
    (User.findById as jest.Mock).mockResolvedValue(null);

    const user = await getUserById('1');
    expect(user).toBeNull();
  });

  it('should throw an error when there is a problem with the database call', async () => {
    const errorMessage = 'Database error';
    (User.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserById('1')).rejects.toThrow(`Failed to get user with id 1`);
  });
  describe('deleteUser', () => {
    const mockUser: IUser = {
      id: '1',
      name: 'John Doe',
      age: 30,
      gender: 'male',
      category: 'A',
      email: 'johndoe@example.com',
    };

    it('should return the deleted user when found and deleted', async () => {
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

      const user = await deleteUser('1');
      expect(user).toEqual(mockUser);
    });


  });
  describe('updateUser', () => {
    const mockUser: IUser = {
      id: '1',
      name: 'John Doe',
      age: 30,
      gender: 'male',
      category: 'A',
      email: 'johndoe@example.com',
    };
  
    it('should return the updated user when update is successful', async () => {
      const updatedData = { name: 'Jane Doe' };
      const updatedUser = { ...mockUser, ...updatedData };
  
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);
  
      const user = await updateUser('1', updatedData);
      expect(user).toEqual(updatedUser);
    });
  
    it('should return null when user is not found', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
  
      const user =await updateUser('1', { name: 'Jane Doe' });
      expect(user).toBeNull();
    });
    
  
    it('should return null and log an error when there is a problem with the database call', async () => {
      const errorMessage = 'Database error';
      (User.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));
  
      console.error = jest.fn();
  
      const user = await updateUser('1', { name: 'Jane Doe' });
      expect(user).toBeNull();
      expect(console.error).toHaveBeenCalledWith("Error updating user:", new Error(errorMessage));
    });
  });
})
