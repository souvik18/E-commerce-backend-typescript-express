import { Router } from 'express';
import * as productController from '../controllers/productController';
import { uploadProductImage } from '../middlewares/upload';

const router = Router();

router.post(
  '/',
  uploadProductImage.single('image'),
  productController.createProduct
);

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

router.put(
  '/:id',
  uploadProductImage.single('image'),
  productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

export default router;
