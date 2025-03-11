import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
  const data = req.body;
  const orderInfo = {
    orderItem: [],
  };

  if (req.user == null) {
    res.status(401).json({
      message: "please login and try again",
    });
    return;
  }

  orderInfo.email = req.user.email;

  const lastOrder = await Order.find().sort({ orderId: -1 }).limit(1);
  if (lastOrder.length == 0) {
    orderInfo.orderId = "ORD0001";
  } else {
    const lastOrderId = lastOrder[0].orderId; // ORD0065
    const lastOrderNumberString = lastOrderId.replace("ORD", ""); // 0065
    const lastOrderNumber = parseInt(lastOrderNumberString); // 65
    const formattedNumber = (lastOrderNumber + 1).toString().padStart(4, "0"); // 0066
    orderInfo.orderId = "ORD" + formattedNumber; // ORD0066
  }

  let ondDayCost = 0;

  for (let i = 0; i < data.orderItem.length; i++) {
    try {
      const product = await Product.findOne({ key: data.orderItem[i].key });

      if (product == null) {
        res.status(404).json({
          message: "Product with key " + data.orderItem[i].key + "not found",
        });
        return;
      }

      if (product.availability == false) {
        res.status(400).json({
          message:
            "Product with key " + data.orderItem[i].key + "is not available",
        });
        return;
      }

      orderInfo.orderItem.push({
        product: {
          key: product.key,
          name: product.name,
          image: product.Image[0],
          price: product.price,
        },
        quantity: data.orderItem[i].qty,
      });

      ondDayCost += product.price * data.orderItem[i].qty;
    } catch (err) {
      res.status(500).json({
        message: "Failed to create order",
      });
    }
  }

  orderInfo.days = data.days;
  orderInfo.startingDate = data.startingDate;
  orderInfo.endingDate = data.endingDate;
  orderInfo.totalAmount = ondDayCost * data.days;

  try {
    const newOrder = new Order(orderInfo);
    const result = await newOrder.save();
    res.json({
      message: "Order created successfully",
      result: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
}
