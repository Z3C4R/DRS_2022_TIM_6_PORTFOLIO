import React from 'react';

function Login(){
    return(
        <section>
            <div className="login">
            <form method="POST">
                <h3 align="center">Login</h3>
                <div class="form-group">
                <label for="email">Email Address: </label>
                <input
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
            </section>
    )

}

export default Login;