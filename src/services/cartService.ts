import db from '../models';

class CartService {
  // Create a new cart for a user
  async createCart(userId: number) {
    const cart = await db.Cart.create({ user_id: userId, status: 'active' });
    return cart;
  }

  // Get active cart for a user
  async getActiveCart(userId: number) {
    const cart = await db.Cart.findOne({
      where: { user_id: userId, status: 'active' },
      include: [
        {
          model: db.CartItem,
          as: 'items',
          include: [{ model: db.Product, as: 'product' }],
        },
      ],
    });
    return cart;
  }

  // Add item to cart
  //   async addItem(cartId: number, productId: number, quantity: number = 1) {
  //     const product = await db.Product.findByPk(productId);
  //     if (!product) throw new Error('Product not found');

  //     // Check if item already exists in cart
  //     let item = await db.CartItem.findOne({ where: { cartId, productId } });
  //     if (item) {
  //       item.quantity += quantity;
  //       await item.save();
  //     } else {
  //       item = await db.CartItem.create({
  //         cartId,
  //         productId,
  //         quantity,
  //         price: product.price,
  //       });
  //     }

  //     return item;
  //   }

//   async addItem(userId: number, productId: number, quantity: number = 1) {
//   // 1️⃣ Find or create active cart
//   let cart = await db.Cart.findOne({
//     where: { user_id: userId, status: 'active' }, // match your DB column 'user_id'
//   });

//   if (!cart) {
//     cart = await db.Cart.create({
//       user_id: userId,
//       status: 'active',
//     });
//   }

//   // 2️⃣ Validate product
//   const product = await db.Product.findByPk(productId);
//   if (!product) {
//     throw new Error('Product not found');
//   }
//   console.log(cart.id,productId,quantity);

// //   let item = await db.CartItem.findOne({
// //     where: {
// //       cartId: cart.id,     // use correct DB column 'cart_id'
// //       productId: productId // use correct DB column 'product_id'
// //     },
// //   });

// //   if (item) {
// //     await item.increment('quantity', { by: quantity });
// //     await item.reload(); // refresh instance
// //   } else {
//     let item = await db.CartItem.create({
//       cartId: cart.id,
//       productId: productId,
//       quantity,
//       price: product.price,
//     });
//  // }

//   return item;
// }

async addItem(userId: number, productId: number, quantity: number = 1) {
  // 1️⃣ Find or create active cart
  let cart = await db.Cart.findOne({
    where: { user_id: userId, status: 'active' }, // match your DB column 'user_id'
  });

  if (!cart) {
    cart = await db.Cart.create({
      user_id: userId,
      status: 'active',
    });
  }

  // 2️⃣ Validate product
  const product = await db.Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // 3️⃣ Check if item already exists in cart
  let item = await db.CartItem.findOne({
    where: {
      cartId: cart.id,     // use correct DB column 'cart_id'
      productId: productId // use correct DB column 'product_id'
    },
  });

  if (item) {
    // ✅ Product exists, increment quantity
    await item.increment('quantity', { by: quantity });
    await item.reload(); // refresh instance
  } else {
    // ✅ New product, create row
    item = await db.CartItem.create({
      cartId: cart.id,
      productId: productId,
      quantity,
      price: product.price,
    });
  }

  return item;
}





  // Update item quantity
  async updateItem(cartId: number, productId: number, quantity: number) {
    const item = await db.CartItem.findOne({ where: { cartId, productId } });
    if (!item) throw new Error('Cart item not found');

    item.quantity = quantity;
    await item.save();
    return item;
  }

  // Remove item from cart
  async removeItem(cartId: number, productId: number) {
    const deleted = await db.CartItem.destroy({ where: { cartId, productId } });
    return deleted > 0;
  }

  // Clear cart
  async clearCart(cartId: number) {
    await db.CartItem.destroy({ where: { cartId } });
  }
}

export default new CartService();
