import db from '../models';
import * as userService from './userService';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';

export const loginUser = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isValid = await userService.verifyPassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

  // Store refresh token in DB
  await db.Token.create({ user_id: user.id, refreshToken });

  return {
    user: { id: user.id, email: user.email, phone: user.phone },
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async (oldRefreshToken: string) => {
  if (!oldRefreshToken) throw new Error('No refresh token provided');

  const tokenInDb = await db.Token.findOne({
    where: { refreshToken: oldRefreshToken, revoked: false },
  });
  if (!tokenInDb) throw new Error('Invalid refresh token');

  const payload: any = verifyRefreshToken(oldRefreshToken);

  const newAccessToken = generateAccessToken({
    id: payload.id,
    email: payload.email,
  });
  const newRefreshToken = generateRefreshToken({
    id: payload.id,
    email: payload.email,
  });

  await tokenInDb.update({ revoked: true, revokedAt: new Date() });
  await db.Token.create({ user_id: payload.id, refreshToken: newRefreshToken });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (refreshToken: string) => {
  if (!refreshToken) throw new Error('No token provided');

  const tokenInDb = await db.Token.findOne({ where: { refreshToken } });
  if (tokenInDb)
    await tokenInDb.update({ revoked: true, revokedAt: new Date() });

  return true;
};
