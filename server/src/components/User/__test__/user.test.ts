import db from '../../../db/index';
import * as faker from 'faker';
import {
  createUser,
  doesUserExist,
  editProfile,
  findUser
} from '../userService';
import sequelize from '../../../db/index';

describe('test the User service', () => {
  let Db: any = db;

  beforeAll(async () => {
    await Db.sync({ force: true });
  });

  it('should return user details if a user exists', async () => {
    const randomString = faker.random.alphaNumeric(10);
    const password = `password`;

    const user = {
      name: `John`,
      email: `user-${randomString}@email.com`,
      password
    };

    await createUser(user);

    const UserExist = await doesUserExist({
      name: `John`,
      email: `user-${randomString}@email.com`,
      password
    });

    expect(UserExist).toMatchObject({
      id: expect.any(Number)
    });
  });

  it('should return null if a user does not exist', async () => {
    const randomString = faker.random.alphaNumeric(10);
    const UserExist = await doesUserExist({
      name: `John`,
      email: `user-${randomString}@email.com`,
      password: 'password'
    });

    expect(UserExist).toBeNull();
  });

  it('should return user if a user exist', async () => {
    const randomString = faker.random.alphaNumeric(10);
    const password = `password`;

    const user = {
      name: `John`,
      email: `user-${randomString}@email.com`,
      password
    } as any;

    await createUser(user);

    const foundUser = await findUser(user);
    expect(foundUser).toMatchObject({
      id: expect.any(Number)
    });
  });

  it('should not return user if a user exist', async () => {
    const randomString = faker.random.alphaNumeric(10);
    const password = `password`;

    const user = {
      name: `John`,
      email: `user-${randomString}@email.com`,
      password
    } as any;

    const foundUser = await findUser(user);
    expect(foundUser).toBeNull();
  });

  afterAll(async (done) => {
    await Db.close();
    done();
  });
});
