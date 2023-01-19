import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


import CoinItem from './CoinItem'
import './Coins.css'
import Coin from '../routes/Coin'
const baseUrl="http://localhost:5000"

export default function Wallet() {

    const {currentUser}=useContext(UserContext);
    const[coinsList, setCointsList]=useState([]);
    let balance = 0;


    const fetchCoins=async()=>{
        const data=await axios.get(`${baseUrl}/coins`)
        const {coins}=data.data
        setCointsList(coins);
        console.log("DATA: ", coins) 
      }

      
    var result = coinsList.filter(coin => {
        return coin.Owner === currentUser.id.toString();
        
    });


    result.forEach(coin => {
        balance=balance + parseFloat(coin.CoinValue);
        
        
        console.log("coin:", {coin});
        console.log(coin.CoinValue);
        console.log("balance", {balance});
    });


      useEffect(()=>{
        fetchCoins();
      },[])
      
      const handleDelete = async (id) => {
        try{
          await axios.delete(`${baseUrl}/coins/${id}`)
          fetchCoins();
    
        } catch(err){
          console.error(err.message)
        }
      }

      return(

    <div align="center"><table className="table">
    <thead>
      <tr>
        <th>Coin Name</th>
        <th>Coin Value</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {result.map((coin) => (
        <tr key={coin.id}>
          <td>{coin.CoinName}</td>
          <td>{coin.CoinValue}</td>
          <td>{coin.created_at}</td>
          <td><button onClick={() => handleDelete(coin.id)}>Sell</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>Balance: {balance}</div>
  </div>


      )
}

