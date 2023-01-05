import React, { useEffect, useState } from "react";
import axios from "axios";
import "./register.css"

const baseUrl="http://localhost:5000"


export default function Register() {
  
  const [firstname, setFirstname]=useState("");
  const [lastname, setLastname]=useState("");
  const [adress, setAdress]=useState("");
  const [city, setCity]=useState("");
  const [country, setCountry]=useState("");
  const [phonenumber, setPhonenumber]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  const[usersList, setUsersList]=useState([]);
  

  const fetchUsers=async()=>{
    const data=await axios.get(`${baseUrl}/users`)
    const {Users}=data.data
    setUsersList(Users);
    console.log("DATA: ", data)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const data=await axios.post(`${baseUrl}/users`,{firstname, lastname, adress, city, country, phonenumber, email, password})
      setUsersList([...usersList, data.data]);
    }catch(err){
      console.error(err.message);
    }
    
  }
  
  const handleDelete = async (id) => {
    try{
      await axios.delete(`${baseUrl}/users/${id}`)
      const updatedList = usersList.filter(event => event.id === id)
      setUsersList(updatedList);
    } catch(err){
      console.error(err.message)
    }
  }


  const handleChange1= e =>{
    setFirstname(e.target.value);
  }
  const handleChange2= e =>{
    setLastname(e.target.value);
  }
  const handleChange3= e =>{
    setAdress(e.target.value);
  }
  const handleChange4= e =>{
    setCity(e.target.value);
  }
  const handleChange5= e =>{
    setCountry(e.target.value);
  }
  const handleChange6= e =>{
    setPhonenumber(e.target.value);
  }
  const handleChange7= e =>{
    setEmail(e.target.value);
  }
  const handleChange8= e =>{
    setPassword(e.target.value);
  }
  
useEffect(()=>{
  fetchUsers();
},[])

  return(
    <div>
        <section>
        <form onSubmit={handleSubmit}>
        <h2 align="center">Sign Up</h2>
        <div className="form-group">
            <label htmlFor="firstname">First Name: </label>
            <input
                onChange={handleChange1}
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter first name"
                value={firstname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name: </label>
              <input
               onChange={handleChange2}
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Enter last name"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address: </label>
              <input
                onChange={handleChange3}
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Enter address"
                value={adress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City: </label>
              <input
                onChange={handleChange4}
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Enter city"
                value={city}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country: </label>
              <input
                onChange={handleChange5}
                type="text"
                className="form-control"
                id="country"
                name="country"
                placeholder="Enter country"
                value={country}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phonenumber">Phone number: </label>
              <input
                onChange={handleChange6}
                type="text"
                className="form-control"
                id="phonenumber"
                name="phonenumber"
                placeholder="Enter phone number"
                value={phonenumber}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                onChange={handleChange7}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                onChange={handleChange8}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </section>
          <section>
          <div>
            <h2>Lista usera</h2>
		       <ul>
              {usersList.map(user => {
                return(
                  <li key={user.id}>
                    {user.firstname}
                    
                    <button onClick={() => handleDelete(user.id)}>X</button>
                  </li>
                )
              })}
           </ul>
          </div>  
        </section>
        </div>
    )
}