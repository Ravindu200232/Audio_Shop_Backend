import { sendOrderConfirmationEmail } from "../middleware/EmailSender.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function createOrder(req, res) {
  const data = req.body;
  console.log(req.user);
  console.log(data);
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

export async function getQuote(req, res) {
  console.log(req.body);
  const data = req.body;
  const orderInfo = {
    orderItem: [],
  };

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
    res.json({
      message: "Order quotation",
      total: orderInfo.totalAmount,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
}


export async function getOrders(req,res){

  try{
    if(req.user == null){
      res.status(401).json({
        message : "please login and try again"
      })
      return;
    }else{
      if(isItAdmin(req)){

        const result = await Order.find();
        res.json({
          message : "Orders fetched successfully",
          orders : result
        })
        return
      }else{
        const result = await Order.find({email : req.user.email});
        res.json({
          message : "Orders fetched successfully",
          orders : result
        })
        return
      }
    }
  }catch(err){
    res.status(500).json({
      err : "Failed to fetch orders"
    })
  }
}

export async function isApproveOrder(req,res) {
  
  try{
   

    if(req.user == null){
      
      res.status(401).json({
        message : "please login and try again"
      })
      return;
    }else{

    if(isItAdmin(req)){
      console.log("hi")
      const result = await Order.findOneAndUpdate({orderId : req.params.orderId},{$set : {isApprove : true}})
      console.log(result)
      await sendOrderConfirmationEmail(result)
      res.json({
        message : "Order approved successfully"
      })
    }else{
      res.json({
        message : "You are not authorized to approve this order"
      })
    }
  }
}catch(err){
  res.status(500).json({
    message : "Failed to approve order"
  })
}
}


export async function deleteOrder(req,res) {

  try{
    if(req.user == null){
      res.status(401).json({
        message : "please login and try again"
      })
    }else{
      if(isItAdmin(req)){
        const result = await Order.deleteOne({orderId : req.params.orderId})
        res.json({
          message : "Order deleted successfully",
          result : result
        })
        return
      }else{
        res.json({
          message : "You are not authorized to delete this order"
        })
        return
      }
    }

  }catch(err){
    res.status(500).json({
      message : "Failed to delete order"
    })
  }
  
}

export async function createPkg(req, res) {
  const data = req.body;
  console.log(data);

  if (req.user == null) {
    res.status(401).json({
      message: "Please login and try again",
    });
    return;
  }

  const orderInfo = {
    email: req.user.email,
    orderItem: data.orderItem, // Directly storing order items from the request body
    days: data.days,
    startingDate: data.startingDate,
    endingDate: data.endingDate,
    totalAmount: data.totalAmount, // Directly storing total amount from the request body
    description: data.description, // Add description here
  };

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

export async function getUserOrder(req,res) {

  try{
    const email = req.user.email

    if(req.user == null){
      res.status(401).json({
        message : "please login and try again"
      })
      return;
    }

      const result = await Order.find({
        email : email
      })
      res.json(result)
      return
    

  }catch(err){
    res.status(500).json({
      message : "Failed to fetch orders"
    })
  }
  
}