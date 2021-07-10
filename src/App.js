import './App.css';
import React, { useState } from 'react';
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {
  const [state, setState] = useState({ status: 'signup' });

  function changeStatus() {
    if (state.status === "signup") {
      setState({ status: 'login' });
    } else {
      setState({ status: 'signup' });
    }
  }

  return (
    <div className="App">
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
        <button className="submit-btn" form="cred-form" type="submit">{(state.status === "signup") ? "SIGN UP" : "LOGIN"}</button>

      </div>
    </div>
  );
}

export default App;
