import React, {useState} from "react";
import { InputText } from 'primereact/inputtext';
import {setLogin} from "../../redux/login";
import {useAppDispatch} from "../../redux/hooks";

import { Password } from 'primereact/password';
import {setPassword} from "../../redux/password";
import { Button } from 'primereact/button';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import './index.css';
import {baseURL} from "../../config";

function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [newLogin, setNewLogin] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function logInReq(event: React.MouseEvent<HTMLButtonElement>, login: String, password: String) {
        event.preventDefault()
        login = encodeURI(login.trim())
        password = encodeURI(password.trim())
        if(login === "" || password === "") {
            toast.error("Fields must be non empty");
            return;
        }
        let formData = new FormData();
        formData.append('login', login.toString());
        formData.append('password', password.toString());
        fetch(baseURL + "/api/login", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if(response.ok){
                    dispatch(setLogin(newLogin))
                    dispatch(setPassword(newPassword))
                    navigate("/mainPage")
                } else {
                    toast.error(response.statusText)
                    console.log(response)
                }
            })
    }

    function signInReq(event: React.MouseEvent<HTMLButtonElement>, login: String, password: String) {
        event.preventDefault()
        login = encodeURI(login.trim())
        password = encodeURI(password.trim())
        if(login === "" || password === "") {
            toast.error("Fields must be non empty")
            return;
        }
        let formData = new FormData();
        formData.append('login', login.toString());
        formData.append('password', password.toString());
        fetch(baseURL + "/api/register",{
            method: 'POST',
            body: formData
        })
            .then(response => {
                if(response.ok){
                    dispatch(setLogin(newLogin))
                    dispatch(setPassword(newPassword))
                    navigate("/mainPage")
                } else {
                    toast.error(response.statusText)
                }
                // console.log(response)
            })
    }

    return (
        <form className="logForm">
            <div>
                <InputText className="inputText" placeholder="Login" value={newLogin} onChange={(e : any) => setNewLogin(e.target.value)} />
            </div>
            <div>
                <Password style={{width: 240, marginLeft: 30}} placeholder="Password" value={newPassword} onChange={(e : any) => setNewPassword(e.target.value)} toggleMask />
            </div>
            <div>
                <Button className="button" label="Log in" onClick={(e : any) => logInReq(e, newLogin, newPassword)}/>
                <Button className="button" label="Sign in" onClick={(e : any) => signInReq(e, newLogin, newPassword)}/>
            </div>
        </form>
    )
}

export default LoginForm;