const { DataStore } = require("notarealdb");

const store = new DataStore("./data");

module.exports = {
  categories: store.collection("categories"),
  orderItems: store.collection("orderItems"),
  orders: store.collection("orders"),
  products: store.collection("products"),
  users: store.collection("users")
};
