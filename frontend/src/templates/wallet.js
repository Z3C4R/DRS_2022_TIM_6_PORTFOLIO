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


    const fetchUsers=async()=>{
        const data=await axios.get(`${baseUrl}/coins`)
        const {coins}=data.data
        setCointsList(coins);
        console.log("DATA: ", coins) 
      }

      
    var result = coinsList.filter(coin => {
        return coin.Owner === currentUser.id.toString();
    });


        console.log(result);
        
      useEffect(()=>{
        fetchUsers();
      },[])
      

      return(

    <div>{JSON.stringify(result, null,2)}</div>


      )
}

