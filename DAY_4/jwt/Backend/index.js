require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connect
// Use the same env var name as defined in `.env` (MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

// USER SCHEMA
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// FOOD SCHEMA
const foodSchema = new mongoose.Schema({
    name: String,
    daysSinceIAte: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Food = mongoose.model("Food", foodSchema);

// TOKEN VERIFY MIDDLEWARE
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Token missing");
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Invalid token");
        req.userId = decoded.userId;
        next();
    });
};

// REGISTER
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashed });

        await user.save();
        res.send("User registered");
    } catch (err) {
        res.status(500).send("Error");
    }
});

// LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid creds");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send("Invalid creds");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch {
        res.status(500).send("Server error");
    }
});

// ADD FOOD
app.post('/api/foods', verifyToken, async (req, res) => {
    const food = new Food({
        name: req.body.name,
        daysSinceIAte: req.body.daysSinceIAte,
        user: req.userId
    });
    await food.save();
    res.json(food);
});

// GET FOODS
app.get('/api/foods', verifyToken, async (req, res) => {
    const foods = await Food.find({ user: req.userId });
    res.json(foods);
});

// UPDATE FOOD
app.put('/api/foods/:id', verifyToken, async (req, res) => {
    const updated = await Food.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
    );

    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
});

// DELETE FOOD
app.delete('/api/foods/:id', verifyToken, async (req, res) => {
    const deleted = await Food.findOneAndDelete({
        _id: req.params.id,
        user: req.userId
    });

    if (!deleted) return res.status(404).send("Not found");
    res.json({ message: "Food deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));