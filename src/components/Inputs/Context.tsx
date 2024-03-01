import React, {ReactNode, useState} from "react";

export interface Coordinates {
    x: string,
    y: string,
    r: string,
    success?: boolean,
    execTime?: string,
    curTime?: string,
    ownerLogin?: string
}

export interface CoordinatesStore{
    getX: string,
    getY: string,
    getR: string,
    getDots: Array<Coordinates>,
    setX: (x: string) => void,
    setY: (y: string) => void,
    setR: (r: string) => void,
    addDot: (dot: Coordinates) => void,
    setDots: (dots: Array<Coordinates>) => void
}
export const DotsFormContext = React.createContext<CoordinatesStore | null>(null)

export const CoordinatesProvider = ({children}: {children: ReactNode}) => {
    const [getCoordinates, setCoordinates] = useState<Coordinates>({
        x: "0",
        y: "0",
        r: "1"
    });

    const [getDots, setDots] = useState<Array<Coordinates>>([])

    const updateX = (newX: string) => {
        setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            x: newX,
        }));
    };

    const updateY = (newY: string) => {
        setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            y: newY,
        }));
    };

    const updateR = (newR: string) => {
        setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            r: newR,
        }));
    };

    const addDot = (dot: Coordinates) => {
        setDots((prevState) => [...prevState, dot]);
    };

    const store = {
        getX: getCoordinates.x,
        getY: getCoordinates.y,
        getR: getCoordinates.r,
        getDots: getDots,
        setX: updateX,
        setY: updateY,
        setR: updateR,
        addDot: addDot,
        setDots: setDots
    }

    return (
        <DotsFormContext.Provider value={store}>
            {children}
        </DotsFormContext.Provider>
    )
}