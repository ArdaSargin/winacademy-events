import styles from '../css/Event.module.css';
import { Box, Container, Flex, Grid, GridItem, Img, Input, Text, FormControl, FormLabel, Button, useToast, UnorderedList } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventsContext from '../context/Events';
import contextFunction from '../hooks/Context';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';

export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [deleteAction, setDeleteAction] = useState(false);
    const [closeForm, setCloseForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const params = useParams();
    const eventEdited = useNavigate();
    const back = useNavigate();

    const { editEvent } = contextFunction();
    const { deleteEvent } = contextFunction();

    const toast = useToast();

    // Making a connection with the server

    useEffect(() => {
        const connection = async () => {
            const response = await fetch(`http://localhost:3000/events/${params.id}`);
            const json = await response.json();
            setEvents(json);
        }
        connection();
    }, [params.id]);

    // Close form

    const close = <CloseIcon onClick={() => setCloseForm(!closeForm)}/>

    // Update content

    const editFunction = (e) => {
        e.preventDefault();
        const updatedTitle = title || events.title;
        const updatedDescription = description || events.description;
        const updatedStartTime = startTime || events.startTime;
        const updatedEndTime= endTime || events.endTime;
        const updatedImage = image || events.image;
        editEvent(params.id, updatedTitle, updatedDescription, updatedImage, updatedStartTime, updatedEndTime);
        toast({
                title: "Everthing is uploaded successfuly!",
                position: "top",
                status: "success",
                isClosable: true
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }

    // Delete content

    const deleteQuestion = <FormControl className={styles.warning}>
        <Text className={styles.warningText}>Are you sure you want to delete something?</Text>
        <UnorderedList className={styles.buttons}>
         <Button className={styles.yes} onClick={yes}>Yes</Button>
         <Button className={styles.no} onClick={no}>No</Button>
        </UnorderedList>
    </FormControl>;

    function yes() {
        deleteEvent(params.id);
        back('/');
        toast({
            title: "Everthing is deleted successfuly!",
            position: "top",
            status: "success",
            isClosable: true
        });
    }

    function no() {
        setDeleteAction(false);
    }

    const deleteFunction = (e) => {
        e.preventDefault();
        setDeleteAction(!deleteAction);
    }

    // The popup form

    const popup = (
        <FormControl as='form' className={styles.popup}>
            {/* If the cross is clicked */}
            {closeForm && window.location.reload()}
            <Box className={styles.closeIcon}>
             {close}
            </Box>

            <Flex className={styles.layout}>
            <FormLabel className={styles.label} htmlFor='Title'>Title</FormLabel>
            <Input className={styles.input} type='text' defaultValue={events.title || ''} onChange={(e) => setTitle(e.target.value)} autoFocus={true} />

            <FormLabel className={styles.label} htmlFor='Description'>Description</FormLabel>
            <Input className={styles.input} type='text' defaultValue={events.description || ''} onChange={(e) => setDescription(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='Image'>Image</FormLabel>
            <Input className={styles.input} type='text' placeholder='copy/paste a url in here' defaultValue={events.image || ''} onChange={(e) => setImage(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='Start time'>Start Time</FormLabel>
            <Input className={styles.input} type='date' defaultValue={events.startTime || ''} onChange={(e) => setStartTime(e.target.value)} />

            <FormLabel className={styles.label} htmlFor='End time'>End Time</FormLabel>
            <Input className={styles.input} type='date' defaultValue={events.endTime || ''} onChange={(e) => setEndTime(e.target.value)} />
            <Button className={styles.button} type='submit' onClick={editFunction}>Save <EditIcon boxSize={6} color="green.100"/></Button>
            </Flex>
        </FormControl>
    );

    return (
        <Container>
            {
                events ? (
               <Container>
                <Flex className={styles.item}>
                    <Box>
                     <Text fontSize={{base:13.5, md:13.5, lg:20}} className={styles.texts}>{events.title}</Text>
                     <Text fontSize={{base:13.5, md:13.5, lg:20}} className={styles.texts}>{events.description}</Text>
                     <Img src={events.image} alt={events.title} width={1000} height={{base:170, md:200, lg:200}}/>
                     <Text fontSize={{base:13.5, md:13.5, lg:20}} className={styles.texts}>{events.startTime}</Text>
                     <Text fontSize={{base:13.5, md:13.5, lg:20}} className={styles.texts}>{events.endTime}</Text>
                    </Box>
                </Flex>

                
                 <Box as='footer' className={styles.footer}>
                    <Button type='button' className={styles.icons} onClick={() => setEditForm(!editForm)}>Edit <EditIcon boxSize={5} color="green.100"/></Button>
                    <Button type='button' className={styles.icons} onClick={deleteFunction}>Delete <DeleteIcon boxSize={5} color="red.100"/></Button>
                 </Box>

                 {/* The edit form */}
                 {editForm && popup}

                 {/* The delete box */}
                 {deleteAction && deleteQuestion}
                </Container>
                ) : null
            }
        </Container>
    )
}