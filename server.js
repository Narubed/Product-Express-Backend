require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
connection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("src"));
app.use("/api/product-express/static", express.static("src"));
// routes

// LOGIN
app.use("/api/product-express/signin-admin", require("./routes/signin.admin"));
app.use(
  "/api/product-express/signin-members",
  require("./routes/signin.members")
);
// Upload File
app.use(
  "/api/product-express/image/members",
  require("./routes/image.members")
);

app.use("/api/product-express/admins", require("./routes/admin"));
app.use("/api/product-express/members", require("./routes/members"));

// Products
app.use("/api/product-express/products", require("./routes/product"));
app.use(
  "/api/product-express/image/product",
  require("./routes/image.product")
);
// company
app.use("/api/product-express/company", require("./routes/compony"));
app.use(
  "/api/product-express/image/company",
  require("./routes/image.company")
);
// Brand
app.use("/api/product-express/brand", require("./routes/brand"));
app.use("/api/product-express/image/brand", require("./routes/image.brand"));
// Type
app.use("/api/product-express/type", require("./routes/type"));
app.use("/api/product-express/image/type", require("./routes/image.type"));

// Cut Around
app.use("/api/product-express/cut_around", require("./routes/cut.around"));
// Partner
app.use("/api/product-express/partners", require("./routes/partners"));
app.use(
  "/api/product-express/image/partners",
  require("./routes/image.partners")
);
app.use(
  "/api/product-express/image2/partners",
  require("./routes/image2.partners")
);

// Pre Orders
app.use("/api/product-express/pre_orders", require("./routes/pre.orders"));
// Discount
app.use("/api/product-express/discount", require("./routes/discount"));
// Cart Shopping
app.use(
  "/api/product-express/cart_shopping",
  require("./routes/cart.shopping")
);
// whitelist
app.use("/api/product-express/whitelist", require("./routes/whitelist"));

app.use("/api/product-express/mailer", require("./routes/mailer"));

// Invoice
app.use("/api/product-express/invoice", require("./routes/invoice.tax"));

const port = process.env.PORT || 9020;
app.listen(port, console.log(`Listening on port ${port}...`));
