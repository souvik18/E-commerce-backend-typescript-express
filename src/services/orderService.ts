import db from '../models';

class OrderService {
  // Create order from user's active cart
  async createOrder(userId: number) {
    // Find active cart
    const cart = await db.Cart.findOne({
      where: { user_id: userId, status: 'active' },
      include: [{ model: db.CartItem, as: 'items' }],
    });
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    // Create order
    const order = await db.Order.create({
      userId,
      totalAmount,
      status: 'pending',
    });

    // Create order items
    const orderItemsData = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    await db.OrderItem.bulkCreate(orderItemsData);

    // Mark cart as ordered
    cart.status = 'ordered';
    await cart.save();

    return order;
  }

  // Get all orders for a user
  async getUserOrders(userId: number) {
    return await db.Order.findAll({
      where: { userId },
      include: [
        {
          model: db.OrderItem,
          as: 'items',
          include: [{ model: db.Product, as: 'product' }],
        },
      ],
    });
  }

  // Get a single order by ID
  async getOrderById(orderId: number) {
    const order = await db.Order.findByPk(orderId, {
      include: [
        {
          model: db.OrderItem,
          as: 'items',
          include: [{ model: db.Product, as: 'product' }],
        },
      ],
    });
    if (!order) throw new Error('Order not found');
    return order;
  }

  // Update order status
  async updateStatus(
    orderId: number,
    status: 'pending' | 'completed' | 'cancelled'
  ) {
    const order = await db.Order.findByPk(orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    await order.save();
    return order;
  }
}

export default new OrderService();
