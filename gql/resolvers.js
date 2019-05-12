const db = require("./db");

const Query = {
  products: () => {
    return db.products.list();
  },
  product: (root, args) => {
    return db.products.get(args.id);
  },
  categories: () => {
    return db.categories.list();
  },
  category: (root, args) => {
    return db.category.get(args.id);
  },
  users: () => {
    return db.users.list();
  },
  user: (root, args) => {
    return db.users.get(args.id);
  },
  orders: (root, args) => {
    return db.orders.list();
  },
  ordersInfo: (root, args) => {
    return db.orders.list().reduce((acc, o) => {
      const items = db.orderItems.list().filter(oi => (oi.orderId = o.id));
      const orderInfo = {
        order: o,
        items
      };
      acc.push(orderInfo);
      return acc;
    }, []);
  }
};

const Order = {
  user: order => db.users.get(order.userId)
};

const OrderItem = {
  product: orderItem => db.products.get(orderItem.productId)
};

const Product = {
  category: product => db.categories.get(product.categoryId)
};

const Mutation = {
  createUser: (root, { input }) => {
    return db.users.get(db.users.create(input));
  },
  createProduct: (root, { input }) => {
    return db.products.get(db.products.create(input));
  },
  createOrder: (root, { input }) => {
    const orderId = db.orders.create({ userId: input.userId });
    const items = input.items.map(i => {
      return db.orderItems.create({
        orderId,
        productId: i.productId,
        quantity: i.quantity
      });
    });
    return {
      order: db.orders.get(orderId),
      items
    };
  }
};

module.exports = { Query, Mutation, Order, OrderItem, Product };
