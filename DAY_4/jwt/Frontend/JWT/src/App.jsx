import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [foods, setFoods] = useState([])
  const [newFoodName, setNewFoodName] = useState('')
  const [newDays, setNewDays] = useState('')

  const token = localStorage.getItem("token")

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foods", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setFoods(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
      fetchFoods()
    }
  }, [])

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:5000/api/login", {
      username, password
    })
    localStorage.setItem("token", response.data.token)
    setIsLoggedIn(true)
    fetchFoods()
  }

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/api/register", { username, password })
    alert("User Registered")
  }

  // ADD FOOD
  const handleAddFood = async (e) => {
    e.preventDefault()
    await axios.post(
      "http://localhost:5000/api/foods",
      { name: newFoodName, daysSinceIAte: newDays },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setNewFoodName("")
    setNewDays("")
    fetchFoods()
  }

  // DELETE FOOD
  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/foods/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    fetchFoods()
  }

  return (
    <div className="App">

      {!isLoggedIn ? (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username"
              value={username} onChange={(e) => setUsername(e.target.value)} />

            <input type="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Login</button>
          </form>

          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username"
              onChange={(e) => setUsername(e.target.value)} />

            <input type="password" placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Register</button>
          </form>
        </>
      ) : (
        <>
          <h1>Food List</h1>

          <form onSubmit={handleAddFood}>
            <input type="text" placeholder="Food name"
              value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />

            <input type="number" placeholder="Days since ate"
              value={newDays} onChange={(e) => setNewDays(e.target.value)} />

            <button type="submit">Add Food</button>
          </form>

          <ul>
            {foods.map(f => (
              <li key={f._id}>
                {f.name} - {f.daysSinceIAte} days
                <button onClick={() => handleDelete(f._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}

    </div>
  )
}

export default App