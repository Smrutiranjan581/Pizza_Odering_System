const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
  res.send("Pizza House Backend Running");
});

// ================= AUTH MIDDLEWARE =================

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. Login first."
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Token missing."
    });
  }

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
      "SELECT id FROM pizza_users WHERE mobile = ? OR email = ?",
      [mobile, email || null]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: "User already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO pizza_users (name, mobile, email, password)
       VALUES (?, ?, ?, ?)`,
      [name, mobile, email || null, hashedPassword]
    );

    res.status(201).json({
      message: "Signup successful!",
      userId: result.insertId
    });

  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      message: "Signup failed."
    });
  }
});

// ================= LOGIN =================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const [users] = await pool.execute(
      "SELECT * FROM pizza_users WHERE email = ?",
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
    console.error("Login Error:", error);

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
      `INSERT INTO pizza_orders
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
        `INSERT INTO pizza_order_items
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

app.get("/api/orders/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    const [orders] = await pool.execute(
      `SELECT *
       FROM pizza_orders
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
       FROM pizza_order_items
       WHERE order_id = ?`,
      [order.id]
    );

    res.json({
      message: "Order found!",
      order,
      items
    });

  } catch (error) {
    console.error("Track Order Error:", error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// ================= MY ORDERS =================

app.get("/api/my-orders", authenticateToken, async (req, res) => {
  try {
    const [orders] = await pool.execute(
      `SELECT *
       FROM pizza_orders
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      orders
    });

  } catch (error) {
    console.error("My Orders Error:", error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Pizza House Backend Running");
  console.log(`Server running on port ${PORT}`);
});

/* =========================================
   TERMS & PRIVACY MODAL
========================================= */

const legalModal = document.getElementById("legalModal");
const legalTitle = document.getElementById("legalTitle");
const legalContent = document.getElementById("legalContent");
const legalIcon = document.getElementById("legalIcon");


const termsContent = `

  <div class="legal-highlight">
    🍕 By using Pizza House, you agree to follow these Terms & Conditions.
    Please read them carefully before placing an order.
  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">01</span>
      Acceptance of Terms
    </h3>

    <p>
      By accessing our website, creating an account, or placing an order,
      you agree to comply with these Terms & Conditions.
    </p>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">02</span>
      Orders & Payments
    </h3>

    <ul>
      <li>All orders are subject to availability.</li>
      <li>Prices may change without prior notice.</li>
      <li>Please verify your order before placing it.</li>
      <li>Payment must be completed according to the selected payment method.</li>
    </ul>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">03</span>
      Delivery
    </h3>

    <p>
      Delivery times may vary depending on location, traffic, weather,
      restaurant workload, and other operational conditions.
    </p>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">04</span>
      Cancellations & Refunds
    </h3>

    <p>
      Cancellation and refund eligibility may depend on the preparation
      status of your order and the applicable payment method.
    </p>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">05</span>
      User Responsibilities
    </h3>

    <p>
      Users must provide accurate contact, delivery, and account information.
      Misuse of the website may result in account restrictions.
    </p>

  </div>
`;


const privacyContent = `

  <div class="legal-highlight">
    🔒 Your privacy matters to Pizza House. We collect only the information
    required to provide a better ordering experience.
  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">01</span>
      Information We Collect
    </h3>

    <ul>
      <li>Name and contact information.</li>
      <li>Email address and mobile number.</li>
      <li>Delivery address and order details.</li>
      <li>Account information required for authentication.</li>
    </ul>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">02</span>
      How We Use Your Information
    </h3>

    <p>
      Your information is used to process orders, manage your account,
      provide customer support, and improve our services.
    </p>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">03</span>
      Data Security
    </h3>

    <p>
      We take reasonable measures to protect your information and maintain
      secure access to your account and ordering data.
    </p>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">04</span>
      Information Sharing
    </h3>

    <p>
      We do not sell your personal information. Information may only be
      shared when necessary to process and deliver your order.
    </p>

  </div>


  <div class="legal-section">

    <h3>
      <span class="legal-number">05</span>
      Your Control
    </h3>

    <p>
      You may contact Pizza House for questions regarding your account
      information or privacy concerns.
    </p>

  </div>
`;


/* OPEN MODAL */

function openLegalModal(type){

  legalModal.classList.add("active");

  document.body.style.overflow = "hidden";


  if(type === "terms"){

    legalTitle.textContent =
      "Terms & Conditions";

    legalIcon.textContent =
      "📜";

    legalContent.innerHTML =
      termsContent;

  }


  if(type === "privacy"){

    legalTitle.textContent =
      "Privacy Policy";

    legalIcon.textContent =
      "🔒";

    legalContent.innerHTML =
      privacyContent;

  }

}


/* CLOSE MODAL */

function closeLegalModal(){

  legalModal.classList.remove("active");

  document.body.style.overflow = "";

}


/* ESC KEY */

document.addEventListener("keydown", function(event){

  if(event.key === "Escape"){

    closeLegalModal();

  }

});