import styles from '../css/List.module.css';
import React, { useState } from 'react';
import EventsShow from './EventsShow';
import { Container, OrderedList, Box, Button, FormControl, Input, Text } from '@chakra-ui/react';
import EventsContext from '../context/Events';
import contextFunction from '../hooks/Context';
import EventsAdd from './EventsAdd';

export default function EventsList() {
    const [search, setSearch] = useState('');
    const [openForm, setOpenForm] = useState(false);

    // Making a connection with the server

    const { events } = contextFunction();

    // Delete event while searching

    const searchBar = (search, events) => {
        if (!search) {
            return events;
        } else {
            return events.filter((remove) => remove.title.includes(search) || remove.description.includes(search));
        }
    }

    const removed = searchBar(search, events);

    // The events list

    const list = removed.map((exactEvent) => {
        return <EventsShow key={exactEvent.id} exactEvent={exactEvent} />;
    });

    return (
        <Container>
            <Box className={styles.form}>
                <Button className={styles.button} type='button' onClick={() => setOpenForm(!openForm)}>Add event</Button>
            </Box>

            <Box className={styles.form}>
                <FormControl className={styles.search}>
                <Input type='search' placeholder='Search an event' value={search} onChange={(e) => setSearch(e.target.value)}/>
                </FormControl>
            </Box>

            <Box className={styles.text}>
                <Text as='h3'>All events</Text>
            </Box>

            {/* Opens the form */}
            <Box className={styles.popupForm}>
             {openForm && <EventsAdd />}
            </Box>
            <OrderedList className={styles.list}>{list}</OrderedList>
        </Container>
    );
}