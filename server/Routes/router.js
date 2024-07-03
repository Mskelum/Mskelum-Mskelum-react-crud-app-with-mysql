const express = require("express");
const router = express.Router();
const conn = require("../db/db_connection");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Register user data
router.post("/create", (req, res) => {
    const { id, name, email, job, number } = req.body;

    if (!id || !name || !email || !job || !number) {
        return res.status(422).json({ error: "Please fill all fields" });
    }

    conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        
        if (result.length > 0) {
            return res.status(422).json({ error: "This email is already registered" });
        } else {
            conn.query("INSERT INTO users SET ?", { id, name, email, job, number }, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Internal server error" });
                }
                return res.status(201).json({ message: "User created successfully", user: req.body });
            });
        }
    });
});

// Get user data
router.get("/getusers", (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json(result);
    });
});

// Delete user
router.delete("/deleteuser/:id", (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    });
});

// Get single user
router.get("/induser/:id", (req, res) => {
    const { id } = req.params;
    conn.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(result);
    });
});

// Update user
router.patch("/updateuser/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    conn.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "User updated successfully" });
    });
});

module.exports = router;
