import Login from './templates/login';
import Register from './templates/register';
import Index from './templates/index';
import React from 'react';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const baseUrl="https://localhost:5000"

export default function App() {
  
  const fetchUsers=async()=>{
    const data=await axios.get('${baseUrl}/users')
    console.log("DATA: ", data)
  }
  
  return (
    <>
    <Index />
    <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

