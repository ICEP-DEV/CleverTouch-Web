const express = require("express");
const session = require('express-session');
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// MySQL database connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "clevertouch",
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Endpoint for user creation (signup)
app.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  db.query(
    "INSERT INTO user (name, email, password) VALUES (?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating user");
      } else {
        console.log("User created successfully!");
        res.status(200).send("User created successfully!");
      }
    }
  );
});

// Endpoint for user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error logging in");
      } else {
        if (result.length > 0) {
          // Store user ID in session upon successful login
          req.session.userId = result[0].id;
          console.log("User logged in successfully!");
          res.status(200).send({ message: "User logged in successfully!", result, success: true });
        } else {
          res.status(401).send({ message: "Invalid email or password", success: false });
        }
      }
    }
  );
});



// Endpoint to logout user
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error logging out");
    } else {
      console.log("User logged out successfully!");
      res.status(200).send("User logged out successfully!");
    }
  });
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
