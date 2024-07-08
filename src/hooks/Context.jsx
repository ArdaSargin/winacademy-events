import { useContext } from "react";
import EventsContext from "../context/Events";

function contextFunction() {
    return useContext(EventsContext);
}

export default contextFunction;