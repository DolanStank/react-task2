import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';


function Login(props) {
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLabel, setErrorLabel] = useState("");

    const history = useHistory();

    const handelClick = (e) => {
        e.preventDefault();
        for (let account of props.accounts) {
            if (account.email === email &&
                account.password === password) {
                    props.setLoggedIn(true);
                    props.setUser(account);
                    history.push("/");
            }
        }
        setErrorLabel("incorrect email or password");
    }

    return (
        <div className="center">
            <form>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    >
                </input> <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    >
                </input> <br />
                <label className="errorLabel" style={{color: "red"}}>{errorLabel}</label> <br />
                <button onClick={handelClick}>Login</button> <br />
            </form>
            <label>Don't have an account? </label>
            <Link to="/Signup">Signup</Link>
        </div>
    )
    
}

export default Login;