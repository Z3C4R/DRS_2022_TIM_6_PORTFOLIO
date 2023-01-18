import React, { useContext, useState } from "react";
import axios from "axios";
import "./profile.css";
import { UserContext } from "../UserContext";

const baseUrl="http://localhost:5000"


export default function Profile() {
    
  const {currentUser}=useContext(UserContext);


  const [firstname, setFirstname]=useState(currentUser.Firstname);
  const [lastname, setLastname]=useState(currentUser.Lastname);
  const [adress, setAdress]=useState(currentUser.Adress);
  const [city, setCity]=useState(currentUser.City);
  const [country, setCountry]=useState(currentUser.Country);
  const [phonenumber, setPhonenumber]=useState(currentUser.Phonenumber);
  const [email, setEmail]=useState(currentUser.Email);
  const [password, setPassword]=useState(currentUser.Password);
  
  const[usersList, setUsersList]=useState([]);

  function emptyCheck(){
    if(firstname === "" || lastname === "" || adress === "" || city === "" || country === "" || phonenumber === "" || email === "" || password === ""){
      alert("All fileds must be filled !");
      return true;
    } 
  }
    
   function letterCheck(){
    var letters = /^[A-Za-z]+$/;
    var addressValidation = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
    var lettersAndSpace = /^[A-Za-z\s]+$/;
    var phoneValidation = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g;
    var pwValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if(!letters.test(firstname) || !letters.test(lastname) || !addressValidation.test(adress) || !lettersAndSpace.test(city) || !phoneValidation.test(phonenumber) || pwValidation.test(password)){
      alert("Not all fields are filled properly,please check again");
      return true;
      
    }
  }

  const handleSubmit = async (e) =>{

    e.preventDefault();

    if(emptyCheck() === true) return;
    if(letterCheck() === true) return;

    currentUser.Firstname = firstname;
    currentUser.Lastname = lastname;
    currentUser.Adress = adress;
    currentUser.City = city;
    currentUser.Country = country;
    currentUser.Phonenumber = phonenumber;

    try{
      const data=await axios.put(`${baseUrl}/users/${currentUser.id}`,{firstname, lastname, adress, city, country, phonenumber, email, password})
      
      setUsersList([...usersList, data.data]);
      alert("Uspesno izmenjen profil!")
      
    }catch(err){
      console.error(err.message);
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
  

  return(
    
    <div>
      <center>
        <section>        
        <form onSubmit={handleSubmit}>
        <h2 align="center">Profile</h2>
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
            
            <button type="submit" className="btn btn-primary">Edit profile</button>
            <h3>Loged in:{currentUser.Firstname}</h3>
            <pre>{JSON.stringify(currentUser, null,2)}</pre>
          </form>
          </section>
        </center>
        </div>
    )
}