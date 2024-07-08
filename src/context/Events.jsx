import { useState, createContext, useContext, useCallback } from "react";
import axios from 'axios';

const EventsContext = createContext();

const Provider = ({ children }) => {
    const [events, setEvents] = useState([]);

    // Accessing the context

    const value = useContext(EventsContext);

    // Getting the event

    const getEvent = useCallback(async () => {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
    }, []);

    const addEvent = async (title, description, image, startTime, endTime) => {
        const response = await axios.post('http://localhost:3000/events', {
            title,
            description,
            image,
            startTime,
            endTime
        });
        const update = [ ...events, response.data ];
        setEvents(update);
    }

    // Editing an event

    const editEvent = async (id, newTitle, newDescription, newImage, newStartTime, newEndTime) => {
        const response = await axios.put(`http://localhost:3000/events/${id}`, {
            title: newTitle,
            description: newDescription,
            image: newImage,
            startTime: newStartTime,
            endTime: newEndTime
        });

        const newEvents = events.map((newEvent) => {
            if (newEvent.id === id) {
                return { ...newEvent, ...response.data };
            }

            return newEvent;
        });
        setEvents(newEvents);
    }

    // Delete events

    const deleteEvent = async (id) => {
        const response = await axios.delete(`http://localhost:3000/events/${id}`);
        const deletedEvents = events.filter((remove) => {
            return remove.id !== id;
        });
        setEvents(deletedEvents);
    }

    // All functions

    const functions = {
        events,
        getEvent,
        addEvent,
        editEvent,
        deleteEvent
    };

    return <EventsContext.Provider value={functions}>{children}</EventsContext.Provider>
}

export { Provider };
export default EventsContext;