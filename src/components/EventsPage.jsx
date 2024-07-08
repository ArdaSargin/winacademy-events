import styles from '../css/List.module.css';
import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import EventsContext from '../context/Events';
import contextFunction from '../hooks/Context';
import EventsAdd from './EventsAdd';
import EventsList from './EventsList';

export default function EventsPage() {

    // Making a connection with the server

    const { getEvent } = contextFunction(EventsContext);

    useEffect(() => {
        getEvent();
    }, [getEvent]);

    return (
        <Container>
            {/* The events list */}
            <EventsList />
        </Container>
    );
}