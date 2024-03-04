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

    let validateX = (x: string) => {
        const xFloat = parseFloat(x.replace(',', '.'));
        return xFloat <= 5 && xFloat >= -5;
    }
    let validateY = (y: string) => {
        const yFloat = parseFloat(y.replace(',', '.'));
        return yFloat <= 3 && yFloat >= -3;
    }
    let validateR = (r: string) => {
        const rFloat = parseFloat(r.replace(',', '.'));
        return rFloat <= 5 && rFloat >= 0;
    }

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
        const x = parseFloat(context.getX.replace(',', '.'));
        const y = parseFloat(context.getY.replace(',', '.'));
        const r = parseFloat(context.getR.replace(',', '.'));
        formData.append("x", x.toString())
        formData.append("y", y.toString())
        formData.append("r", r.toString())
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

    if (!context) return (<></>);
    return (
        <form className="inpts" onSubmit={parseFormSubmit}>
            <div>
                <label>X:</label>
                <InputText className="inputText" aria-describedby="x-help" value={context.getX}
                           onChange={(e: any) => context.setX(e.target.value)}/>
                <small id="x-help">
                    Enter X from -5 to 5.
                </small>
            </div>
            <div>
                <label>Y:</label>
                <InputText className="inputText" aria-describedby="y-help" value={context.getY}
                           onChange={(e: any) => context.setY(e.target.value)}/>
                <small id="y-help">
                    Enter Y from -3 to 3.
                </small>
            </div>
            <div>
                <label>R:</label>
                <InputText className="inputText" aria-describedby="r-help" value={context.getR}
                           onChange={(e: any) => context.setR(e.target.value)}/>
                <small id="r-help">
                    Enter R from 0 to 5.
                </small>
            </div>
            <div>
                <Button className="submitBtn" type="submit" label="Submit"/>
            </div>
        </form>
    );
}

export default Inputs;