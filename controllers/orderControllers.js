const { findProduct } = require("../services/productServices");
const { findUser } = require("../services/userServices");
const {
  findOrderByUser,
  createOrder,
  updateOrder,
} = require("../services/orderServices");

const actionAddToCart = async (req, res) => {
  try {
    const productCode = req.body.productCode;
    const userEmail = req.body.clientEmail;

    console.log("orderController: ", productCode, userEmail);
    const product = await findProduct(productCode);
    const user = await findUser(userEmail);

    console.log("orderController Producto: ", product);
    console.log("orderController Usuario: ", user);
    if (product && user) {
      let order = await findOrderByUser(user.id);
      console.log("orderController Orden: ", order);
      if (!order) {
        order = await createOrder(user, product);
        if (order) {
          console.log("orderController-createOrder Orden: ", order);
          return res
            .status(200)
            .json({ mensaje: "Producto agregado al carrito." });
        } else {
          return res
            .status(400)
            .json({ error: "No se pudo agregar producto." });
        }
      } else {
        const updatedOrder = await updateOrder(order.id, product);
        console.log("orderController-updateOrder Orden: ", updatedOrder);
        if (updatedOrder) {
          return res
            .status(200)
            .json({ mensaje: "Producto agregado al carrito." });
        } else {
          return res
            .status(400)
            .json({ error: "No se pudo agregar producto." });
        }
      }
    } else {
      return res
        .status(400)
        .json({ error: "No se pudo encontrar producto o usuario." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito." });
  }
};

module.exports = {
  actionAddToCart
}