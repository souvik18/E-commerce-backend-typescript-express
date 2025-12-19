import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const userId = req.body.userId; // Use authenticated user in production
      const order = await OrderService.createOrder(userId);
      res.status(201).json(order);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getUserOrders(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const orders = await OrderService.getUserOrders(userId);
      res.json(orders);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.orderId);
      const order = await OrderService.getOrderById(orderId);
      res.json(order);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { orderId, status } = req.body;
      const order = await OrderService.updateStatus(orderId, status);
      res.json(order);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new OrderController();
