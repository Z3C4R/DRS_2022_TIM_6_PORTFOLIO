import Login from './templates/login';
import Register from './templates/register';
import Index from './templates/index';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
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

