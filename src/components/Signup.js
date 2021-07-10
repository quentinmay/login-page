
import { useState } from 'react'
import CognitoUserPool from '../CognitoUserPool';
function Signup({ setState }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit(event) {
        event.preventDefault();

        if (event.target.elements[1].value !== event.target.elements[2].value) {
            event.target.elements[1].style.border = "2px dashed red";
            event.target.elements[2].style.border = "2px dashed red";
            alert("Passwords don't match");
            return;
        }
        CognitoUserPool.signUp(email, password, [], null, function (err, data) {
            if (!err) { //Worked. Account created.
                setState({ status: "login" });
                alert("Account created! Confirm your email please.");
                console.log(data);
            } else { //Didnt work
                console.log(err);
                switch (err.name) {
                    case "InvalidPasswordException":
                        event.target.elements[1].style.border = "2px dashed red";
                        event.target.elements[2].style.border = "2px dashed red";
                        break;
                    case "UsernameExistsException":
                        event.target.elements[0].style.border = "2px dashed red";
                        break;
                    default:
                        break;
                }
                alert(err.message);
            }
        })
    }

    return (
        <>
            <form className="form-container" id="cred-form" onSubmit={submit} >
                <input className="form-item" id="email" type="email" placeholder="Email *" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <input className="form-item" id="password1" type="password" placeholder="Password *" onChange={(event) => setPassword(event.target.value)} required />
                <input className="form-item" id="password2" type="password" placeholder="Re-enter Password *" required />
            </form>

        </>
    );
}

export default Signup;