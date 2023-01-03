import React from "react";

export default function Register() {
    return(
        <section>
        <form method="POST">
        <h3 align="center">Sign Up</h3>
        <div class="form-group">
            <label for="firstname">First Name: </label>
            <input
                type="text"
                class="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter first name"
              />
            </div>
            <div class="form-group">
              <label for="lastname">Last Name: </label>
              <input
                type="text"
                class="form-control"
                id="lastname"
                name="lastname"
                placeholder="Enter last name"
              />
            </div>
            <div class="form-group">
              <label for="address">Address: </label>
              <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                placeholder="Enter address"
              />
            </div>
            <div class="form-group">
              <label for="city">City: </label>
              <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                placeholder="Enter city"
              />
            </div>
            <div class="form-group">
              <label for="country">Country: </label>
              <input
                type="text"
                class="form-control"
                id="country"
                name="country"
                placeholder="Enter country"
              />
            </div>
            <div class="form-group">
              <label for="phone">Phone number: </label>
              <input
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
              />
            </div>
            <div class="form-group">
              <label for="email">Email: </label>
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
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </section>
    )
}