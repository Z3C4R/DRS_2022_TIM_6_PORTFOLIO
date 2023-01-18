import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import { UserContext } from "../UserContext";

const baseUrl="http://localhost:5000"

function Login(){

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {currentUser, setCurrentUser}=useContext(UserContext);
    const[usersList, setUsersList]=useState([]);

    const handleChange7= e =>{
        setEmail(e.target.value);
      }
    const handleChange8= e =>{
        setPassword(e.target.value);
      }

  const fetchUsers=async()=>{
    const data=await axios.get(`${baseUrl}/users`)
    const {Users}=data.data
    setUsersList(Users);
    console.log("DATA: ", data)
  }


  function emptyCheck(){
    if(email === "" || password === ""){
      alert("All fileds must be filled !");
      return true;
    } 
  }
    
  function matchCheck(){
    var res=0;
    usersList.forEach(user => {
      if(user.Email===email && user.Password===password){
        res++;
        setCurrentUser(user);
      }
    }
    );
    if(res===1) return true;
    else return false;
  }

  var result = usersList.filter(user => {
    return user.Email === email;
    });

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if(emptyCheck() === true) return;
    if(matchCheck()=== false) {
      if(result.length === 0) {
        alert("User with this email don't exist!");
        return;
      }else{
          alert("Password is incorrect!");
          return;
      }
    }
   

    try{
      
      console.log("Loged in!");
      window.location.href = "/";

    }catch(err){
      console.error(err.message);
    }
    
  }

  useEffect(()=>{
    fetchUsers();
  },[])

    return(
        <section>
          <center>
            <div className="login">
            <form onSubmit={handleSubmit}>
                <h2 align="center">Login</h2>
                <div className="form-group">
                <label htmlFor="email">Email Address: </label>
                <input
                    onChange={handleChange7}
                    align = "center"
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
               />
                </div>
                 <div className="form-group">
                 <label htmlFor="password">Password: </label>
                 <input
                    onChange={handleChange8}
                    align = "center"
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Login</button>
                    <h3>Loged in:</h3>
                    <pre>{JSON.stringify(currentUser, null,2)}</pre>
                </form>
            </div>
            </center>
            </section>
    )

}

export default Login;