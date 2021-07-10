
import { useState } from 'react'
import CognitoUserPool from '../CognitoUserPool';
function Signup({ setState }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit(event) {
        event.preventDefault();
        console.log();
        if (event.target.elements[1].value !== event.target.elements[2].value) {
            alert("Passwords don't match.");
            return;
        }
        CognitoUserPool.signUp(email, password, [], null, function (err, data) {
            if (!err) { //Worked. Account created.
                setState({ status: "login" });
                alert("Account created! Now login please.");
                console.log(data);
            } else {
                console.log(err);
                alert(err.message);
            }
        })
    }

    return (
        <>
            <form className="form-container" id="cred-form" onSubmit={submit} >
                {/* <label htmlFor="email">Email:</label> */}
                <input className="form-item" id="email" type="email" placeholder="Email *" value={email} onChange={(event) => setEmail(event.target.value)} required />
                {/* <label htmlFor="password">Password:</label> */}
                <input className="form-item" id="password1" type="password" placeholder="Password *" onChange={(event) => setPassword(event.target.value)} required />
                <input className="form-item" id="password2" type="password" placeholder="Re-enter Password *" required />
            </form>

        </>
    );
}

export default Signup;