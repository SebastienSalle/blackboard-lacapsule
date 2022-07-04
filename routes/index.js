const express = require("express");
const { aggregate } = require("../models/articles");
const router = express.Router();

const articleModel = require("../models/articles");
const orderModel = require("../models/orders");

const userModel = require("../models/users");

const adminID = "5c52e4efaa4beef85aad5e52"

/* GET home page. */
router.get("/", async function (req, res, next) {
  const emptyStocks = await articleModel.find({ stock: 0 });

  const user = await userModel.findById(adminID);
  console.log(user)
  const messages = user.messages;

  let unreadMessages = 0;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].read == false) {
      unreadMessages += 1;
    }
  }

  const taches = user.tasks;
  let taskInprogress = 0;

  for (let i = 0; i < taches.length; i++) {
    if (taches[i].dateCloture == null) {
      taskInprogress += 1;
    }
  }

  res.render("index", {
    emptyStocks: emptyStocks.length,
    unreadMessages,
    taskInprogress,
    adminFName: user.firstName,
    adminLName: user.lastName,
  });
});

/* GET tasks page. */
router.get("/tasks-page", async function (req, res, next) {
  const user = await userModel.findById(adminID);
  res.render("tasks", { taches: user.tasks, adminFName: user.firstName,
    adminLName: user.lastName, });
});

/* GET Messages page. */
router.get("/messages-page", async function (req, res, next) {
  const user = await userModel.findById(adminID);

  res.render("messages", { messages: user.messages, adminFName: user.firstName,
    adminLName: user.lastName, });
});

/* GET Users page. */
router.get("/users-page", async function (req, res, next) {
  const users = await userModel.find({ status: "customer" });

  res.render("users", { users });
});

/* GET Catalog page. */
router.get("/catalog-page", async function (req, res, next) {
  const articles = await articleModel.find();

  res.render("catalog", { articles });
});

/* GET Orders-list page. */
router.get("/orders-list-page", async function (req, res, next) {
  const orders = await orderModel.find();

  res.render("orders-list", { orders });
});

/* GET Order detail page. */
router.get("/order-page", async function (req, res, next) {
  const order = await orderModel
    .findById(req.query.id)
    .populate("articles")
    .exec();

  res.render("order", { order });
});

/* GET chart page. */
router.get("/charts", async function (req, res, next) {
  const femaleUsers = await userModel.find({
    status: "customer",
    pronoun1: "she",
  });
  const maleUsers = await userModel.find({ 
    status: "customer", 
    pronoun1: "he" 
  });
  const otherUsers = await userModel.find({ 
    status: "customer", 
    pronoun1: "they", 
  });

  const user = await userModel.findById(adminID);
  const messages = user.messages;

  let unreadMessages = 0;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].read == false) {
      unreadMessages += 1;
    }
  }
  const readMessages = messages.length - unreadMessages;

  //---les commandes expédiées ou non
  const sended = await orderModel.find({
    status_payment: "validated",
    status_shipment: true,
  });
  const unsended = await orderModel.find({
    status_payment: "validated",
    status_shipment: false,
  });
  // les "refused" en sont pas comptés

  //pour le CA
  // var orders = await orderModel.find();

  const aggregate = orderModel.aggregate();
  
  aggregate.match({ status_payment: "validated", });
  // ? besoin de filtrer par année ? ex. année en cours ou ici 2019
  aggregate.group({
    _id: {
      caYear: { $year: "$date_payment" },
      caMonth: { $month: "$date_payment" },
    },
    caTotal: { $sum: "$total" },
  });
  aggregate.sort({ _id: 1 });
  
  const caData = await aggregate.exec();

  res.render("charts", {
    femaleUsers: femaleUsers.length,
    maleUsers: maleUsers.length,
    otherUsers : otherUsers.length,
    readMessages,
    unreadMessages,
    sended: sended.length,
    unsended: unsended.length,
    caData

  });
});

module.exports = router;
