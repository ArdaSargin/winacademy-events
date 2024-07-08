import styles from '../css/List.module.css';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import React, { useState } from 'react';
import EventsContext from '../context/Events';
import contextFunction from '../hooks/Context';

export default function EventsAdd() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [closeForm, setCloseForm] = useState(false);

    // Making a connection with the server

    const { addEvent} = contextFunction();

    const toast = useToast();

    // Close form

    const close = <CloseIcon onClick={() => setCloseForm(!closeForm)}/>

    function eventAdded(e) {
        e.preventDefault();
        if (title === '' || description === '' || image === '' || startTime === '' || endTime === '') {
            toast({
                title: "The fields can't be empty!",
                position: "top",
                status: "error",
                isClosable: true
            });
        } else {
            addEvent(title, description, image, startTime, endTime);
            toast({
                title: "A new event is added!",
                position: "top",
                status: "success",
                isClosable: true
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return (
        <FormControl as='form' className={styles.popup} isRequired>
            {/* If the cross is clicked */}
            {closeForm && window.location.reload()}
            <Box className={styles.closeIcon}>
             {close}
            </Box>

            <FormLabel className={styles.label} htmlFor='Title'>Title</FormLabel>
            <Input className={styles.input} type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='Description'>Description</FormLabel>
            <Input className={styles.input} type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='Image'>Image</FormLabel>
            <Input className={styles.input} type='text' placeholder='copy/paste a url in here' value={image} onChange={(e) => setImage(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='Start time'>Start Time</FormLabel>
            <Input className={styles.input} type='date' value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='End time'>End Time</FormLabel>
            <Input className={styles.input} type='date' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <Button className={styles.button} type='submit' onClick={eventAdded}>Add event</Button>
        </FormControl>
    );
}