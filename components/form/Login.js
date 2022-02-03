import { useState, useContext } from "react";

import UserContext from "../context/User";

const Form = () =>
{
    const initialState = "";

    const { signIn } = useContext( UserContext );

    const [ username, setUsername ] = useState( initialState );

    const [ passwd, setPasswd ] = useState( initialState );

    const [ validationMessage, setMessage ] = useState( initialState );

    const validate = input => !( !input || input == "" );

    const submitHandler = e =>
    {
        e.preventDefault();

        if( validate( username ) && validate( passwd ) )
        {
            signIn( username, passwd );

        }
        else
        {
            setMessage('Please enter your username and password');

        }

    }

    return (
        <form className="sign-in">
            <input 
                type="text" 
                name="username"
                id="username"
                placeholder="username"
                onChange={e => setUsername( e.target.value )}
                className="sign-in field"
            />
            <input
                type="password"
                name="passwd" 
                id="passwd" 
                placeholder="password"
                onChange={e => setPasswd( e.target.value )}
                className="sign-in field"
            />
            {validationMessage != '' &&
                <div className="sign-in validationMessage">
                    {validationMessage}
                </div>
            }
            <button
                onClick={e => submitHandler( e )}
                className="sign-in submit"
            >
                Sign In
            </button>
        </form>
    );

}

export default Form;
