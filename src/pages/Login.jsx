import React from 'react';
import {ArrowRightShort} from 'react-bootstrap-icons'
import {LOGIN, REGISTRATION} from '../mutations/users.js'
import {useInput} from "../hooks/useInput";
import '../styles/login.scss'
import {useMutation} from "@apollo/client";

const Login = () => {

    const email = useInput('')
    const password = useInput('')

    const [login] = useMutation(LOGIN)
    const [registration] = useMutation(REGISTRATION)

    async function onSubmit(e) {
        e.preventDefault()
        registration({
            variables: {
                input: {
                    email: email.value,
                    password: password.value
                }
            }
        })
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }


    return (
        <div id="wrapper">
            <form id="signin" method="" action="" autoComplete="off">
                <input {...email} type="text" id="user" name="user" placeholder="username"/>
                <input {...password} type="password" id="pass" name="pass" placeholder="password"/>
                <button type="submit" onClick={onSubmit}><ArrowRightShort className={'arrow_right_icon'} width={30}
                                                                          height={30}/></button>
                <p>forgot your password? <a href="#">click here</a></p>
            </form>
        </div>
    );
};

export default Login;
