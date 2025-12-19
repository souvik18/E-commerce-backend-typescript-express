import { ModelCtor } from 'sequelize';
import { initUserModel, User } from './user';
import { initTokenModel, Token } from './token';
import { initCartModel, Cart } from './cart';
import { initProductModel, Product } from './product';
import { initCartItemModel, CartItem } from './cart_items';
import { initOrderModel, Order } from './order';
import { initOrderItemModel, OrderItem } from './order_item';
import sequelize from '../config/database';

interface DB {
  sequelize: typeof sequelize;
  Sequelize: typeof import('sequelize').Sequelize;
  User: ModelCtor<User>;
  Token: ModelCtor<Token>;
  Cart: ModelCtor<Cart>;
  Product: ModelCtor<Product>;
  CartItem: ModelCtor<CartItem>;
  Order: ModelCtor<Order>;
  OrderItem: ModelCtor<OrderItem>;
  [key: string]: any;
}

const db = {} as DB;

// Init models
db.User = initUserModel(sequelize);
db.Token = initTokenModel(sequelize);
db.Cart = initCartModel(sequelize);
db.Product = initProductModel(sequelize);
db.CartItem = initCartItemModel(sequelize);
db.Order = initOrderModel(sequelize);
db.OrderItem = initOrderItemModel(sequelize);

// ----------------------- Associations ----------------------- //

// User ↔ Token
db.User.hasMany(db.Token, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'tokens',
});
db.Token.belongsTo(db.User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  as: 'user',
});

// User ↔ Cart
db.User.hasMany(db.Cart, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'carts',
  onDelete: 'CASCADE',
});
db.Cart.belongsTo(db.User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  as: 'user',
});

// Cart ↔ CartItem
db.Cart.hasMany(db.CartItem, {
  sourceKey: 'id',
  foreignKey: 'cartId',
  as: 'items',
  onDelete: 'CASCADE',
});
db.CartItem.belongsTo(db.Cart, {
  targetKey: 'id',
  foreignKey: 'cartId',
  as: 'cart',
  onDelete: 'CASCADE',
});

// Product ↔ CartItem
db.Product.hasMany(db.CartItem, {
  sourceKey: 'id',
  foreignKey: 'productId',
  as: 'cartItems',
  onDelete: 'CASCADE',
});
db.CartItem.belongsTo(db.Product, {
  targetKey: 'id',
  foreignKey: 'productId',
  as: 'product',
  onDelete: 'CASCADE',
});

// User ↔ Order
db.User.hasMany(db.Order, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'orders',
  onDelete: 'CASCADE',
});
db.Order.belongsTo(db.User, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
});

// Order ↔ OrderItem
db.Order.hasMany(db.OrderItem, {
  sourceKey: 'id',
  foreignKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE',
});
db.OrderItem.belongsTo(db.Order, {
  targetKey: 'id',
  foreignKey: 'orderId',
  as: 'order',
  onDelete: 'CASCADE',
});

// Product ↔ OrderItem
db.Product.hasMany(db.OrderItem, {
  sourceKey: 'id',
  foreignKey: 'productId',
  as: 'orderItems',
  onDelete: 'CASCADE',
});
db.OrderItem.belongsTo(db.Product, {
  targetKey: 'id',
  foreignKey: 'productId',
  as: 'product',
  onDelete: 'CASCADE',
});

db.sequelize = sequelize;
db.Sequelize = require('sequelize').Sequelize;

export default db;
