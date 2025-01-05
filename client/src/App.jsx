import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Admin from './pages/admin';
import AddProduct from './pages/addProduct';
import UpdateProduct from './pages/updateProduct';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/addProduct" element={<AddProduct/>}/>
          <Route path="/updateProduct" element={<UpdateProduct/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
