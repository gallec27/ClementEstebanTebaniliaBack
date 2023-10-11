const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const OrderDetail = require("../models/orderDetails");

async function createOrder(user, product) {
  try {
    const { productPrice } = product;

    const { id, address, location } = user;

    const newOrder = {
      total_price: productPrice,
      shipping_type: "Retira por el local",
      shipping_address: address.concat(" - ", location),
      user_id: id,
    };

    const order = await Order.create(newOrder);
    
    await addOrUpdateOrderDetail(order.id, product.id, 1, productPrice);

    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder(orderId, product) {
  try {
    const order = await findOrderById(orderId);

    if (order) {
      const currentTotalPriceNumeric = parseFloat(order.total_price);
      const productPriceNumeric = parseFloat(product.productPrice);

      if (!isNaN(currentTotalPriceNumeric) && !isNaN(productPriceNumeric)) {
        const newTotalPrice = currentTotalPriceNumeric + productPriceNumeric;
        
        await order.update({ total_price: newTotalPrice });
       
        await addOrUpdateOrderDetail(
          orderId,
          product.id,
          1,
          productPriceNumeric
        );
      } else {
        throw new Error("Valores no numéricos para la suma.");
      }

      return order;
    } else {
      throw new Error("La orden no fue encontrada.");
    }
  } catch (error) {
    throw error;
  }
}

async function addOrUpdateOrderDetail(orderId, productId, quantity, price) {
  try {
    
    const existingDetail = await OrderDetail.findOne({
      where: { order_id: orderId, product_id: productId },
    });

    if (existingDetail) {
      const existingPriceNumeric = parseFloat(existingDetail.price);
      
      const priceNumeric = parseFloat(price);

      if (!isNaN(existingPriceNumeric) && !isNaN(priceNumeric)) {       
        const newQuantity = existingDetail.quantity + quantity;
        const newPrice = existingPriceNumeric + priceNumeric;
        
        await existingDetail.update({ quantity: newQuantity, price: newPrice });
      } else {
        throw new Error("Valores no numéricos para la suma.");
      }
    } else {      
      const newDetail = await OrderDetail.create({
        order_id: orderId,
        product_id: productId,
        quantity,
        price,
      });

      return newDetail;
    }
  } catch (error) {
    throw error;
  }
}

async function findOrderByUser(userId) {
  try {
    const order = await Order.findOne({
      where: { user_id: userId },
    });
    return order;
  } catch (error) {
    throw error;
  }
}

async function findOrderById(orderId) {
  try {
    const order = await Order.findOne({
      where: { id: orderId },
    });
    return order;
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(orderId) {
  try {
    const order = await findOrderById(orderId);

    await order.destroy();
  } catch (error) {
    throw error;
  }
}

async function checkOrder(orderId) {
  try {
    const order = await findOrder(orderId);

    return order !== null;
  } catch (error) {
    throw error;
  }
}

async function readOrders() {
  try {
    const orders = await Order.findAll();
    return orders;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  findOrderByUser,
  findOrderById,
  deleteOrder,
  checkOrder,
  readOrders,
  updateOrder,
  addOrUpdateOrderDetail,
};
