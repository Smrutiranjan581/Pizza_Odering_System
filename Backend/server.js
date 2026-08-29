const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/", (req, res) => {
  res.send("Pizza House Backend Running");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. Login first."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token."
    });
  }
}

// ================= SIGNUP =================

app.post("/api/signup", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({
        message: "Name, mobile and password are required."
      });
    }

    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE mobile = ? OR email = ?",
      [mobile, email || null]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: "User already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO users (name, mobile, email, password)
       VALUES (?, ?, ?, ?)`,
      [name, mobile, email || null, hashedPassword]
    );

    res.status(201).json({
      message: "Signup successful!",
      userId: result.insertId
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Signup failed."
    });
  }
});

// ================= LOGIN =================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed."
    });
  }
});

// ================= CREATE ORDER =================

app.post("/api/orders", authenticateToken, async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();

    const {
      items,
      totalAmount,
      trainName,
      pickupStation
    } = req.body;

    if (!items || items.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        message: "Cart is empty."
      });
    }

    const orderCode =
      "PH" + Date.now().toString().slice(-8);

    const [orderResult] = await connection.execute(
      `INSERT INTO orders
      (
        order_id,
        user_id,
        total_amount,
        train_name,
        pickup_station
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        orderCode,
        req.user.id,
        totalAmount,
        trainName || null,
        pickupStation || null
      ]
    );

    const databaseOrderId = orderResult.insertId;

    for (const item of items) {
      await connection.execute(
        `INSERT INTO order_items
        (
          order_id,
          item_name,
          item_meta,
          quantity,
          unit_price
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
          databaseOrderId,
          item.name,
          item.meta || null,
          item.qty || 1,
          item.unitPrice
        ]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: orderCode,
      status: "Order Confirmed"
    });

  } catch (error) {
    console.error("Order Error:", error);

    if (connection) {
      await connection.rollback();
    }

    res.status(500).json({
      message: "Order could not be placed."
    });

  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// ================= TRACK ORDER =================

app.get(
  "/api/orders/:orderId",
  authenticateToken,
  async (req, res) => {
    try {
      const { orderId } = req.params;

      const [orders] = await pool.execute(
        `SELECT *
         FROM orders
         WHERE order_id = ?
         AND user_id = ?`,
        [orderId, req.user.id]
      );

      if (orders.length === 0) {
        return res.status(404).json({
          message: "Invalid Order ID."
        });
      }

      const order = orders[0];

      const [items] = await pool.execute(
        `SELECT
          item_name,
          item_meta,
          quantity,
          unit_price
         FROM order_items
         WHERE order_id = ?`,
        [order.id]
      );

      res.json({
        message: "Order found!",
        order,
        items
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error."
      });
    }
  }
);

// ================= MY ORDERS =================

app.get(
  "/api/my-orders",
  authenticateToken,
  async (req, res) => {
    try {
      const [orders] = await pool.execute(
        `SELECT *
         FROM orders
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [req.user.id]
      );

      res.json({
        orders
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error."
      });
    }
  }
);

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Pizza House Backend Running");
  console.log(`http://localhost:${PORT}`);
});