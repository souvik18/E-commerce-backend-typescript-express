import db from '../models';
import { Product } from '../models/product';
import { InferAttributes } from 'sequelize';

export const createProduct = async (data: {
  name: string;
  price: number;
  imagePath?: string;
  imageSize?: number;
}) => {
  return await db.Product.create(data);
};

export const getAllProducts = async () => {
  return await db.Product.findAll();
};

export const getProductById = async (id: number) => {
  return await db.Product.findByPk(id);
};

export const updateProduct = async (
  id: number,
  data: Partial<InferAttributes<Product>>
) => {
  const product = await db.Product.findByPk(id);
  if (!product) throw new Error('Product not found');

  await product.update(data);
  return product;
};

export const deleteProduct = async (id: number) => {
  const product = await db.Product.findByPk(id);
  if (!product) throw new Error('Product not found');

  await product.destroy();
  return true;
};
