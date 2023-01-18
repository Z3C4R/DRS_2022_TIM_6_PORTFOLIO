import React, { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

function Changepw(){

    const {currentUser,setCurrentUser}=useContext(UserContext);

    const [password, setPassword]=useState("");
    const [newPassword,setnewPassword] = useState("");
    const [confirmNewPassword,setconfirmNewPassword] = useState("");

    const handleChange1= e =>{
        setPassword(e.target.value);
      }
      const handleChange2= e =>{
        setnewPassword(e.target.value);
      }
      const handleChange3= e =>{
        setconfirmNewPassword(e.target.value);
      }

      function matchCheck(){
       
            if(currentUser.Password === newPassword){
                alert("New password can not be same as old one !");
                return false;
            }else if(newPassword === confirmNewPassword){
                return true;
            }
        

      }

      const handleSubmit = async (e) =>{

        e.preventDefault();
    
        alert("password")

        if(!matchCheck){
            return
        }else{
            currentUser.Password = newPassword;
            console.log(currentUser.Password);
        }
    
    /*
        try{
          const data=await axios.put(`${baseUrl}/users/${currentUser.id}`,{firstname, lastname, adress, city, country, phonenumber, email, password})
          
          setUsersList([...usersList, data.data]);
          alert("Uspesno izmenjen profil!")
          
        }catch(err){
          console.error(err.message);
        }
        */


      }
    
    

    return(

        <div>
        <center>
          <section>        
          <form onSubmit={handleSubmit}>
          <h2 align="center">Sign Up</h2>
          <div className="form-group">
              <label htmlFor="firstname">Current password: </label>
              <input
                  onChange={handleChange1}
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter first name"
                  value={currentUser.Password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Set new password: </label>
                <input
                 onChange={handleChange2}
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter last name"
                  value={newPassword}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Repeat new password: </label>
                <input
                  onChange={handleChange3}
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  value={confirmNewPassword}
                />
              </div>

              <button type="submit" className="btn btn-primary">Change pw</button>
            </form>
        </section>
        </center>
        </div>

        )

    }

    export default Changepw;

