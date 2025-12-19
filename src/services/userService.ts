import db from '../models';
import bcrypt from 'bcrypt';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { User } from '../models/user';

const SALT_ROUNDS = 10;

export const createUser = async (
  userData: Omit<
    InferCreationAttributes<User>,
    'id' | 'createdAt' | 'updatedAt'
  >
) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const user = await db.User.create({ ...userData, password: hashedPassword });
  return user;
};

export const getAllUsers = async () => {
  return await db.User.findAll();
};

export const getUserById = async (id: number) => {
  return await db.User.findByPk(id);
};

export const updateUser = async (
  id: number,
  updateData: Partial<InferAttributes<User>>
) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error('User not found');

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }

  await user.update(updateData);
  return user;
};

export const deleteUser = async (id: number) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error('User not found');

  await user.destroy();
  return true;
};

export const getUserByEmail = async (email: string) => {
  return await db.User.findOne({ where: { email } });
};

export const verifyPassword = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
