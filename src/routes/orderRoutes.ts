import { Router } from 'express';
import OrderController from '../controllers/orderController';

const router = Router();

// Create order from active cart
router.post('/', OrderController.createOrder);

// Get all orders for a user
router.get('/user/:userId', OrderController.getUserOrders);

// Get a single order
router.get('/:orderId', OrderController.getOrderById);

// Update order status
router.put('/status', OrderController.updateStatus);

export default router;
