const { Product, OrderItem, Order, Bill } = require("../../db/models");

module.exports = {
  getUserOrder: async (req, res, next) => {
    try {
      // get user Order will create an active Order if they don't have one.

      const { restaurantId } = req.params;
      let user = req.user;
      console.log("USER ", user);
      let order = user.orders.find((order) => order.status === "Pending");

      if (!order) {
        order = await Order.create({
          userId: user.id,
          restaurantId,
        });
        await order.setUser(user);
        await user.addOrder(order);
      }

      res.json(order.products);
    } catch (e) {
      next(e);
    }
  },
  addItemToOrder: async (req, res, next) => {
    try {
      // add to Order function is receiving a total quantity number of a specific food item and adding it to the db. For example, sequelize will throw an error if you try to add multiple 'burgers'.
      const { quantity } = req.query;
      const { productId } = req.params;
      let userQuantity = quantity;
      const user = req.user;
      const item = await Product.findByPk(productId);
      const order = user.orders.find((order) => order.status === "Pending");
      /*
      {"1": { quantity: 3}, "3": { quantity: 2}}
      */

      const orderItem = await OrderItem.findOne({
        where: { orderId: order.id, productId: item.id },
      });

      if (!orderItem) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.id,
          price: item.price,
          quantity,
        });

        await order.setUser(user.id);
        await user.addOrder(order.id);
      } else {
        let newQuantity = Number(orderItem.quantity) + Number(userQuantity);
        await OrderItem.update({
          quantity: newQuantity,
        });
      }

      res.json(await Order.findByPk(order.id, { include: Product }));
    } catch (e) {
      next(e);
    }
  },
  deleteItemFromOrder: async (req, res, next) => {
    try {
      // delete item from Order is being called when you delete one 3D object so this function will make sure we deduct one from the count and destroy the row if it goes below 1.
      const { productId } = req.params;

      const user = req.user;
      const item = await Product.findByPk(productId);
      const order = user.orders.find((Order) => Order.status === "Pending");
      const orderItem = await OrderItem.findOne({
        where: { orderId: order.id, productId: item.id },
      });

      let newQuantity = Number(orderItem.quantity) - 1;

      if (newQuantity < 1) {
        await OrderItem.destroy({
          where: { orderId: order.id, productId: item.id },
        });
      } else {
        await OrderItem.update({
          quantity: Number(orderItem.quantity) - 1,
        });
      }

      res.json(await Order.findByPk(order.id, { include: Product }));
    } catch (e) {
      next(e);
    }
  },
  orderFood: async (req, res, next) => {
    try {
      const user = req.user;

      const lastOrder = user.orders.find((order) => order.status === "Pending");
      const userOrder = await Order.findByPk(lastOrder.id, {
        include: Product,
      });

      await userOrder.update({ status: "Ordered" });
      const newOrder = await Order.create();

      await newOrder.setUser(user);
      await user.addOrder(newOrder);

      res.send(204);
    } catch (e) {
      next(e);
    }
  },
};
