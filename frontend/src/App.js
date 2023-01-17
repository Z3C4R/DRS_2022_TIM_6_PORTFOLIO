import Login from './templates/login';
import Register from './templates/register';
import Navbar from './templates/navbar';
import CoinNavbar from './components/CoinNavbar';
import Coins from './components/Coins';
import Home from './templates/home';
import React, {useMemo, useState, useEffect} from 'react';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {UserContext} from './UserContext';


export default function App() {
  
  const [currentUser, setCurrentUser] = useState(null);

  const userValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]);

  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
 
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      console.log(response.data[0])

    }).catch((error) => {
      console.log(error)
    })

  }, [])
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={userValue}>
      <Navbar />
      <Coins coins={coins} />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );

  
}

