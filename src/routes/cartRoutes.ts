import { Router } from 'express';
import CartController from '../controllers/cartController';

const router = Router();

// Create a new cart
// router.post('/', CartController.createCart);

// Get active cart for user
router.get('/user/:userId', CartController.getActiveCart);

// Add item to cart
router.post('/item', CartController.addItem);

// Update item quantity
router.put('/item', CartController.updateItem);

// Remove item
router.delete('/item', CartController.removeItem);

export default router;
