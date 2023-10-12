const { findProduct } = require("../services/productServices");
const { findUser } = require("../services/userServices");
const {
  findOrderByUser,
  createOrder,
  updateOrder,
  findOrderDetails,
  deleteOrderDetail,
  subtractProductPriceFromOrderTotal
} = require("../services/orderServices");

const { findProductsByProductIds } = require("../services/productServices");

const actionAddToCart = async (req, res) => {
  try {
    const productCode = req.body.productCode;
    const userEmail = req.body.clientEmail;
    
    const product = await findProduct(productCode);
    const user = await findUser(userEmail);
    
    if (product && user) {
      let order = await findOrderByUser(user.id);      
      if (!order) {
        order = await createOrder(user, product);
        if (order) {          
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

const getOrder = async (req, res) => {
  try {
    const userId = req.query.userId;
    
    const order = await findOrderByUser(userId);
   
    if (order) {
      const orderDetails = await findOrderDetails(order.id);      
      
      if (orderDetails) {
        
        const productIds = orderDetails.map(detail => detail.product_id);
        
        const orderProducts = await findProductsByProductIds(productIds);
        
        if (orderProducts){
          res.status(200).json({
            success: true,
            message: "Orden encontrada.",
            order: order,
            orderDetails: orderDetails,
            orderProducts: orderProducts
          });
        } else {          
          return res.status(400).json({ error: "No se pudo productos de la orden." });
        }
      } else {
        return res.status(400).json({ error: "No se pudo encontrar detalle." });
      }
    } else {
      return res.status(400).json({ error: "No se pudo encontrar orden." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar orden." });
  }
};

const actionDeleteFromCart = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const orderDetailsId = req.body.orderDetailsId;
    const totalProduct = req.body.totalProduct;    
    
    console.log("orderController-actionDeleteFromCart: ", orderId, orderDetailsId, totalProduct)
    await deleteOrderDetail(orderDetailsId);
    
    await subtractProductPriceFromOrderTotal(orderId, totalProduct);

    return res.status(200).json({ mensaje: "Producto eliminado del carrito." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto del carrito." });
  }
};

module.exports = {
  actionAddToCart,
  getOrder,
  actionDeleteFromCart
};
