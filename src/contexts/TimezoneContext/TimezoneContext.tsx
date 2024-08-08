import React, { useEffect, useState } from "react";
import ContextProps from "../props/contextProps";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone";

const TimezoneContext = React.createContext<TimezoneExposed|undefined>(undefined)

const TimezoneContextComponent = (props : ContextProps) => {
    const [currentTimezone, setTimezone] = useState<string>();

    dayjs.extend(utc)
    dayjs.extend(timezone)

    useEffect(() => {
        let tz = dayjs.tz.guess();
        dayjs.tz.setDefault(tz ?? "Europe/Paris")
        setTimezone(tz)
    }, [])
    
    const getTimezone = () => {
        return currentTimezone ?? "Europe/Paris";
    }

    const exposedValue : TimezoneExposed = {
        getTimezone
    }

    return (
        <TimezoneContext.Provider value={exposedValue}>
            {props.children}
        </TimezoneContext.Provider>
    )
}

interface TimezoneExposed {
    getTimezone: () => string
}

export {TimezoneContext, TimezoneContextComponent}

export default TimezoneContext