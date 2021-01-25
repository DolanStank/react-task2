import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Login';
import Signup from "./Signup";
import HomePage from "./HomePage";

export default function App() {

  //acounts are declared here as array of objects
  const [accounts, setAccounts] = useState([{"firstName": "Lan", "lastName": "Pavletič", "email": "admin", "password": "admin"}]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  //not the best way to update accounts... 
  const updateUser = () => {
    let newAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].email === user.email) {
        newAccounts.push(user);
      } else {
        newAccounts.push(accounts[i]);
      }
    }
    setAccounts(newAccounts);
  }

  useEffect(() => {
    updateUser();
  }, [user])

  return (
    <Router>
        <Switch>
            <Route path="/login">
                <Login
                  accounts={accounts}
                  setAccounts={setAccounts}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  user={user}
                  setUser={setUser}
                />
            </Route>
            <Route path="/signup">
                <Signup
                  accounts={accounts}
                  setAccounts={setAccounts}
                />
            </Route>
            <Route path="/">
                <HomePage
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  user={user}
                  setUser={setUser}
                />
            </Route>
        </Switch>     
    </Router>
  );
}

