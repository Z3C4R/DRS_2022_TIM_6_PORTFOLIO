import Login from './templates/login';
import Register from './templates/register';
import Navbar from './templates/navbar';
import Home from './templates/home';
import React, {useMemo, useState} from 'react';
import axios from "axios";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {UserContext} from './UserContext';


export default function App() {
  
  const [currentUser, setCurrentUser]=useState(null);

  const userValue= useMemo(()=>({currentUser, setCurrentUser}),[currentUser,setCurrentUser]);

  return (

    <BrowserRouter>
      <UserContext.Provider value={userValue}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>       
    </BrowserRouter>
    
  );
}

