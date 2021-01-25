import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ModalStyle.css'

function HomePage(props) {

    const [open, setOpen] = useState(false);

    const history = useHistory();


    useEffect(() => {
        //if noone is loggedin reroute to login page
        if (!props.loggedIn) {
            history.push("/login")
        }
    })

    return (
        <div>
            <h1>Logged in as {props.user.firstName} {props.user.lastName}</h1>
            <button onClick={() => setOpen(true)}>settings</button>
            <button onClick={() => props.setLoggedIn(false)}>logout</button>
            <Modal 
                open={open}
                setOpen={setOpen}
                user={props.user}
                setUser={props.setUser}
            />

        </div>
    )
}

export default HomePage;

function Modal(props) {

    const [changeName, setChangeName] = useState(true);
    if (!props.open) return null;

    console.log("here")
    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <h2>User settings</h2>
                <nav className="navBar">
                    <ul>
                        <li><a onClick={() => setChangeName(true)}>change name</a></li>
                        <li><a onClick={() => setChangeName(false)}>change password</a></li>
                    </ul>
                </nav>
                {changeName ? <ChangeName {...props}/> : <ChangePassword {...props} />}
            </div>
        </>
    )
}

function ChangeName(props) {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorLabel, setErrorLabel] = useState("");

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

        //I couldn+t find a better way to update
        props.setUser({firstName: firstName, 
                        lastName: lastName, 
                        email: props.user.email, 
                        password: props.user.password})
        props.setOpen(false);        
    }

    return (
        <div>
            <form>
                <label>change first name</label> <br />
                <input 
                    type="text" 
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="first name"
                >
                    </input> <br />
                <label>change last name</label> <br />
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="last name"
                ></input> <br />
                <label className="errorLabel" style={{color: "red"}}>{errorLabel}</label> <br />
                <button onClick={() => props.setOpen(false)}>cancel</button>
                <button onClick={handelClick}>accept</button>
            </form>
        </div>
    )
}

function ChangePassword(props) {

    const [password, setPassword] = useState("");
    const [errorLabel, setErrorLabel] = useState("");

    //reused function, it should be declared in seperate file
    const validPassword = (password) => {
        //Regex for password with 8 characters and at least one number.
        let re = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return re.test(password)
    }

    const handelClick = (e) => {
        e.preventDefault();

        if (!validPassword(password)) {
            setErrorLabel("enter a valid password");
            return ;
        }
        
        props.setUser({firstName: props.user.firstName,
                        lastName: props.user.lastName, 
                        email: props.user.email, 
                        password: password})
        props.setOpen(false);
    }

    return (
        <div>
            <form>
                <label>change password</label> <br />
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                >
                    </input> <br />
        
                <label className="errorLabel" style={{color: "red"}}>{errorLabel}</label> <br />
                <button onClick={() => props.setOpen(false)}>cancel</button>
                <button onClick={handelClick}>accept</button>
            </form>
        </div>
    )
}