import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

function Signup(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLabel, setErrorLabel] = useState("");

    const history = useHistory();

    const validEmail = (email) => {
        // Regex for valid email.
        let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(email);
    }

    const validPassword = (password) => {
        //Regex for password with 8 characters and at least one number.
        let re = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return re.test(password);
    }

    const emailExists = (email) => {
        for (let account of props.accounts) {
            if (account.email === email) {
                return true;
            }
        }
        return false;
    }

    const handelClick = (e) => {

        e.preventDefault();
        if (firstName === "") {
            setErrorLabel("please enter a name");
            return ;
        }
        if (lastName === "") {
            setErrorLabel("please enter your lastname");
            return ;
        }
        if (!validEmail(email)) {
            setErrorLabel("invalid email!");
            return ;
        }
        if (emailExists(email)) {
            setErrorLabel("email already exists");
            return ;
        }
        if (!validPassword(password)) {
            setErrorLabel("invalid password");
            return ;
        }

        let newAccount = {firstName: firstName, lastName: lastName, email: email, password: password};
        let addedAccount = props.accounts.concat(newAccount);
        console.log(addedAccount)
        props.setAccounts(addedAccount);        
        
        history.push("/login");
    }

    return (
        <div className="center">
            <form>
                <h1>Signup</h1>
                <input
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    onChange={(e) => setFirstName(e.target.value)}
                > 
                </input> <br />
                <input
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    onChange={(e) => setLastName(e.target.value)}
                > 
                </input><br />
                <input
                    
                    name="email"
                    placeholder="E-mail"
                    value={email}
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
                <button onClick={handelClick}>Signup</button> <br />
            </form>
            <label>Already have an account? </label>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Signup;
