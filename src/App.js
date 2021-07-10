import './App.css';
import React, { useState, useEffect } from 'react';
import Signup from "./components/Signup"
import Login from "./components/Login"
import CognitoUserPool from './CognitoUserPool';

function App() {
  const [state, setState] = useState({ status: 'signup', user: null });

  useEffect(() => {
    const user = CognitoUserPool.getCurrentUser();
    if (user) {
      setState({ status: "loggedin", user: user });
    }
  }, []);

  function changeStatus() {
    if (state.status === "signup") {
      setState({ status: 'login' });
    } else {
      setState({ status: 'signup' });
    }
  }

  function logout() {
    const user = CognitoUserPool.getCurrentUser();
    if (user) {
      user.signOut();
      setState({ status: "login", user: null });
    }
  }

  return (
    <div className="App">
      {state.status === 'loggedin' && (
        <>
          <h1>Logged in</h1>
          <button className="logout-btn btn" onClick={logout}>Logout</button>

        </>
      )

      } {(state.status === 'signup' || state.status === 'login') && (
        <div className="login-container">
          <h1 className="header">{(state.status === "signup") ? "Sign Up" : "Log in"}</h1>
          {state.status === 'signup' && (
            <Signup setState={setState} />
          )
          } {state.status === 'login' && (

            <Login setState={setState} />
          )
          }
          <p className="switch" onClick={changeStatus}>{(state.status === "signup") ? "Have an account? Log in" : "Create account"}.</p>
          <button className="submit-btn btn" form="cred-form" type="submit">{(state.status === "signup") ? "SIGN UP" : "LOGIN"}</button>

        </div>
      )
      }
    </div>

  );
}

export default App;
