import React from 'react';
import "./login.css";

function Login(){
    return(
            <div className="login">
            <form method="POST">
                <h2 align="center">Login</h2>
                <div class="form-group">
                <label for="email">Email Address: </label>
                <input
                     align = "center"
                     type="email"
                     class="form-control"
                     id="email"
                     name="email"
                      placeholder="Enter email"
               />
                </div>
                 <div class="form-group">
                 <label for="password">Password: </label>
                 <input
                     align = "center"
                   type="password"
                   class="form-control"
                   id="password"
                    name="password"
                        placeholder="Enter password"
                    />
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
    )

}

export default Login;