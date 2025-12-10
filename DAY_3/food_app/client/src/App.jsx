import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [foodname, setFoodname] = useState("");
  const [daysSinceIAte, setDaysSinceIAte] = useState(0);
  const [newFoodname, setNewFoodname] = useState("");
  const [foodList, setFoodList] = useState([]);

  // READ (GET)
  useEffect(() => {
    axios.get("http://localhost:5000/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  // CREATE (POST)
  const addToList = () => {
    axios
      .post("http://localhost:5000/insert", {
        foodname: foodname,
        daysSinceIAte: daysSinceIAte,
      })
      .then(() => {
        setFoodList([
          ...foodList,
          { foodname: foodname, daysSinceIAte: daysSinceIAte },
        ]);
      });
  };

  // UPDATE (PUT)
  const updateFood = (id) => {
    axios
      .put(`http://localhost:5000/update/${id}`, {
        newFoodname: newFoodname,
      })
      .then(() => {
        setFoodList(
          foodList.map((item) =>
            item._id === id ? { ...item, foodname: newFoodname } : item
          )
        );
      });
  };

  // DELETE (DELETE)
  const deleteFood = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(() => {
      setFoodList(foodList.filter((item) => item._id !== id));
    });
  };

  return (
    <div className="App">
      <h1>Food List</h1>

      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodname(event.target.value);
        }}
      />

      <label>Days Since Eaten:</label>
      <input
        type="number"
        onChange={(event) => {
          setDaysSinceIAte(event.target.value);
        }}
      />

      <button onClick={addToList}>Add to List</button>
      <hr />

      {foodList.map((val, key) => (
        <div key={key} className="foodItem">
          <h3>{val.foodname}</h3>
          <p>Days since eaten: {val.daysSinceIAte}</p>

          <input
            type="text"
            placeholder="New Food Name..."
            onChange={(event) => {
              setNewFoodname(event.target.value);
            }}
          />

          <button onClick={() => updateFood(val._id)}>Update</button>
          <button onClick={() => deleteFood(val._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;