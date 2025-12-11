import {useState} from 'react'
import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Home from './Home.jsx'
import BookList from './BookList.jsx'


function App() {
  return (
    <>
    <h1>Aoo.jsx</h1>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books' element={<BookList/>}/>
    </Routes>
    </>
  )
}

export default App