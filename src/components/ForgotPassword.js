import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useState } from 'react'
import CognitoUserPool from '../CognitoUserPool';

function ForgotPassword({ setState }) {
    const [status, setStatus] = useState("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    function getUser() {
        return new CognitoUser({
            Username: email,
            Pool: CognitoUserPool

        })
    }

    function sendEmail(event) {
        event.preventDefault();
        getUser().forgotPassword({
            onSuccess: data => {
                console.log(data);
            },
            onFailure: err => {
                console.error(err);
                alert(err.message);
            },
            inputVerificationCode: data => {
                console.log(data);
                setStatus("getCode");

            }
        });
    }


    function verifyCode(event) {
        event.preventDefault();

        if (event.target.elements[1].value !== event.target.elements[2].value) {
            event.target.elements[1].style.border = "2px dashed red";
            event.target.elements[2].style.border = "2px dashed red";
            alert("Passwords don't match");
            return;
        }
        getUser().confirmPassword(code, password, {
            onSuccess: data => {
                setState({ status: "login", user: null });
            },
            onFailure: err => {
                switch (err.name) {
                    case "CodeMismatchException":
                    case "ExpiredCodeException":
                        event.target.elements[0].style.border = "2px dashed red";

                        break;
                    default:
                        break;

                }
                console.error(err);
                alert(err.message);
            }
        });
    }



    return (
        <>
            {status === "email" && (
                <>
                    <form className="form-container" id="send-email-form" onSubmit={sendEmail} >
                        <input className="form-item" id="email" type="email" placeholder="Email *" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </form>
                    <button className="submit-btn btn" form="send-email-form" type="submit">Send Email</button>

                </>
            )
            } {status === "getCode" && (
                <>
                    <form className="form-container" id="verify-code-form" onSubmit={verifyCode} >
                        <input className="form-item" id="email" type="text" placeholder="Verification Code *" value={code} onChange={(event) => setCode(event.target.value)} required />
                        <input className="form-item" id="password1" type="password" placeholder="New Password *" onChange={(event) => setPassword(event.target.value)} required />
                        <input className="form-item" id="password2" type="password" placeholder="Re-enter New Password *" required />
                    </form>
                    <button className="submit-btn btn" form="verify-code-form" type="submit">Verify Code</button>
                </>
            )
            }

        </>
    );
}

export default ForgotPassword;