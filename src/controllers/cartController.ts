import { Request, Response } from 'express';
import CartService from '../services/cartService';

class CartController {
//   async createCart(req: Request, res: Response) {
//     try {
//       const userId = req.body.userId; // In production, get from auth token
//       const cart = await CartService.createCart(userId);
//       res.status(201).json(cart);
//     } catch (err: any) {
//       res.status(400).json({ error: err.message });
//     }
//   }

  async getActiveCart(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const cart = await CartService.getActiveCart(userId);
      res.json(cart);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  //   async addItem(req: Request, res: Response) {
  //     try {
  //       const { cartId, productId, quantity } = req.body;
  //       const item = await CartService.addItem(cartId, productId, quantity);
  //       res.status(201).json(item);
  //     } catch (err: any) {
  //       res.status(400).json({ error: err.message });
  //     }
  //   }

  async addItem(req: Request, res: Response) {
    console.log(req.body);
    try {
      const userId = req.body.userId; // or req.user.id (JWT)
      const { productId, quantity } = req.body;

      const item = await CartService.addItem(userId, productId, quantity);
      res.status(201).json(item);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const { cartId, productId, quantity } = req.body;
      const item = await CartService.updateItem(cartId, productId, quantity);
      res.json(item);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const { cartId, productId } = req.body;
      const success = await CartService.removeItem(cartId, productId);
      res.json({ success });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new CartController();
