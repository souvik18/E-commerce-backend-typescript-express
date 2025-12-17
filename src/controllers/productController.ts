import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const imagePath = req.file ? req.file.path : undefined;
    const imageSize = req.file ? req.file.size : undefined;

    const product = await productService.createProduct({
      name,
      price: Number(price),
      imagePath,
      imageSize,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await productService.getProductById(+req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const imagePath = req.file ? req.file.path : undefined;
    const imageSize = req.file ? req.file.size : undefined;

    const product = await productService.updateProduct(+req.params.id, {
      ...req.body,
      imagePath,
      imageSize,
    });

    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  await productService.deleteProduct(+req.params.id);
  res.json({ message: 'Product deleted successfully' });
};
