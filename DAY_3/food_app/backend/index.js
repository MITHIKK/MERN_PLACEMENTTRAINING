const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const FoodModel = require('./model/food');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MongoDB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// CREATE
app.post("/insert", async (req, res) => {
    const { foodname, daysSinceIAte } = req.body;

    try {
        const food = new FoodModel({ foodname, daysSinceIAte });
        await food.save();
        res.send("Inserted");
    } catch (err) {
        res.status(500).send(err);
    }
});

// READ
app.get("/read", async (req, res) => {
    try {
        const foods = await FoodModel.find();
        res.json(foods);
    } catch (err) {
        res.status(500).send(err);
    }
});

// UPDATE
app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { newFoodname } = req.body;

    try {
        await FoodModel.findByIdAndUpdate(id, { foodname: newFoodname });
        res.send("Updated");
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await FoodModel.findByIdAndDelete(id);
        res.send("Deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));