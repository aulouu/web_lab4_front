import './index.css';
import {Button} from "primereact/button";
import React, {FormEvent, useContext, useEffect} from "react";
import {AuthorizationStore} from "../../redux/authorizationStore";
import {getLogin} from "../../redux/login";
import {getPassword} from "../../redux/password";
import toast from "react-hot-toast";
import {DotsFormContext} from "./Context";
import {InputText} from "primereact/inputtext";

function Inputs() {
    const context = useContext(DotsFormContext);

    useEffect(() => {
        fetch("/api/dots", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":"
                    + getPassword(AuthorizationStore.getState()))
            }
        })
            .then(r => r.json())
            .then(r => context?.setDots(r))
    }, [])

    let validateX = (x: string) => Number(x) <= 4 && Number(x) >= -4;
    let validateY = (y: string) => Number(y) <= 5 && Number(y) >= -3;
    let validateR = (r: string) => Number(r) <= 4 && Number(r) >= 0;

    function parseFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!context || context.getX == null || context.getY == null || !context.getR == null){
            toast.error("Fill all coordinates")
            return
        }
        if(!validateX(context.getX) || !validateY(context.getY) || !validateR(context.getR)){
            toast.error("Coordinates are not valid")
            return
        }
        let formData = new FormData();
        formData.append("x", context.getX.toString())
        formData.append("y", context.getY.toString())
        formData.append("r", context.getR.toString())
        fetch("/api/dots", {
            method: "POST",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
            body: formData
        })
            .then(r => {
                if (r.ok) return r
                else throw new Error(r.statusText)
            })
            .then(r => r.json())
            .then(r => {
                context.addDot(r)
            })
            .catch(e => toast.error(e.message));
    }

    function sendClear(){
        fetch("/api/dots", {
            method: "DELETE",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
        })
            .then(r => {
                if (r.ok) {
                    context?.setDots([])
                }
            })
    }

    if (!context) return (<></>);
    return (
        <form className="inpts" onSubmit={parseFormSubmit}>
            <div>
                <label>X:</label>
                <InputText className="inputText" value={context.getX} onChange={(e : any) => context.setX(e.target.value)}/>
            </div>
            <div>
                <label>Y:</label>
                <InputText className="inputText" value={context.getY} onChange={(e : any) => context.setY(e.target.value)}/>
            </div>
            <div>
                <label>R:</label>
                <InputText className="inputText" value={context.getR} onChange={(e : any) => context.setR(e.target.value)}/>
            </div>
            <div>
                <Button className="submitBtn" type="submit" label="Submit"/>
                <Button className="submitBtn" type="reset" label="Clear" onClick={sendClear}/>
            </div>
        </form>
    );
}

export default Inputs;