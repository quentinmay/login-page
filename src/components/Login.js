
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useState } from 'react'
import CognitoUserPool from '../CognitoUserPool';
function Login({ setState }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function submit(event) {
        event.preventDefault();
        const user = new CognitoUser({
            Username: email,
            Pool: CognitoUserPool

        })

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })
        user.authenticateUser(authDetails, { onSuccess: data => { onSuccess(data) }, onFailure: err => { onFail(err) }, newPassRequired: data => { newPassRequired(data) } });

        function onSuccess(data) {
            console.log("onSuccess:", data);
            // alert("Successful login!");
            setState({ status: "loggedin", user: user });
        }
        function onFail(err) {
            switch (err.name) {
                case "UserNotConfirmedException":
                    alert("Email has not been confirmed yet.");
                    break;
                default:
                    event.target.elements[0].style.border = "2px dashed red";
                    event.target.elements[1].style.border = "2px dashed red";
                    alert(err.message);
                    break;
            }
            console.log(err);
        }
        function newPassRequired(data) {
            console.log("newPassRequired:", data);
        }
    }

    return (
        <>
            <form className="form-container" id="cred-form" onSubmit={submit}>
                {/* <label htmlFor="email">Email:</label> */}

                <input className="form-item" id="email" type="email" placeholder="Email *" value={email} onChange={(event) => setEmail(event.target.value)} required />
                {/* <label htmlFor="password">Password:</label> */}
                <input className="form-item" id="password1" type="password" placeholder="Password *" value={password} onChange={(event) => setPassword(event.target.value)} required />
                {/* <button className="form-item submit-btn" id="submit" type="submit">Login</button> */}
            </form>
        </>
    );
}

export default Login;