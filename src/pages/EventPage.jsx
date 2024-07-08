import styles from '../css/Event.module.css';
import { Box, Container, Flex, Grid, GridItem, Img, Input, Text, FormControl, FormLabel, Button, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventsContext from '../context/Events';
import contextFunction from '../hooks/Context';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [deleteAction, setDeleteAction] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const params = useParams();
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

    // Showing a form to update

    const form = (
         <Flex className={styles.form}>
            <Input className={styles.input} type='text' defaultValue={title || events.title} onChange={(event) => setTitle(event.target.value)} autoFocus={true} />
            <Input className={styles.input} type='text' defaultValue={description || events.description} onChange={(event) => setDescription(event.target.value)} />
            <Input className={styles.input} type='date' defaultValue={startTime || events.startTime} onChange={(event) => setStartTime(event.target.value)} />
            <Input className={styles.input} type='date' defaultValue={endTime || events.endTime} onChange={(event) => setEndTime(event.target.value)} />
            <Input className={styles.input} type='text' defaultValue={image || events.image} onChange={(event) => setImage(event.target.value)} placeholder='copy/paste a url in here'/>
         </Flex>
    );

    // Edit content
    
    const editFunction = (e) => {
        e.preventDefault();
        if (title === '' || description === '' || startTime === '' || endTime === '' || image === '') {
            toast({
                title: "Update all the fields!",
                position: "top",
                status: "error",
                isClosable: true
            });
        } else {
            editEvent(params.id, title, description, image, startTime, endTime);
            back('/');
            toast({
                title: "Everthing is uploaded successfuly!",
                position: "top",
                status: "success",
                isClosable: true
            });
        }
    }

    // Delete content

    const deleteQuestion = <FormControl className={styles.warning}>
        <Text className={styles.warningText}>Are you sure you want to delete something?</Text>
        <Button className={styles.yes} onClick={yes}>Yes</Button>
        <Button className={styles.no} onClick={no}>No</Button>
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

    // Saving a deleting events

    const saveEdit = <Button className={styles.icons} onClick={editFunction}>Edit <EditIcon boxSize={5} color="green.100" /></Button>;
    const saveDelete = <Button className={styles.icons} onClick={deleteFunction}>Delete <DeleteIcon  boxSize={5} color="red.100" /></Button>;

    return (
        <Container>
            <Flex className={styles.box}>
            {/* Displaying the list */}
            {
                events ? (
                    <Container>
            <Box className={styles.imagePosition}>
                <Img className={styles.image} src={events.image} alt={events.title} />
            </Box>

            <Grid className={styles.layout}>
             <GridItem className={styles.grid}>
                  <Box className={styles.list}>
                    {editForm ? <Input className={styles.input} type='text' defaultValue={title || events.title} onChange={(event) => setTitle(event.target.value)} autoFocus={true} /> : <Text>{events.title}</Text>}
                  </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='text' defaultValue={description || events.description} onChange={(event) => setDescription(event.target.value)} /> : <Text>{events.description}</Text>}
                </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='date' defaultValue={startTime || events.startTime} onChange={(event) => setStartTime(event.target.value)} /> : <Text>{events.startTime}</Text>}
                </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='date' defaultValue={endTime || events.endTime} onChange={(event) => setEndTime(event.target.value)} /> : <Text>{events.endTime}</Text>}
                </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='text' defaultValue={image || events.image} onChange={(event) => setImage(event.target.value)} placeholder='copy/paste a url in here'/> : <Text>Edit image</Text>}
                </Box>
             </GridItem>
            </Grid>

            {/* The footer */}
            <Box className={styles.footer} as='footer'> 
                {editForm ? saveEdit : <Button className={styles.icons} onClick={() => setEditForm(!editForm)}>Edit <EditIcon boxSize={5} color="green.100" /></Button>}
                {deleteAction ? saveDelete : <Button className={styles.icons} onClick={deleteFunction}>Delete <DeleteIcon  boxSize={5} color="red.100" /></Button>}
            </Box>

            {/* Deleting the form */}
            {deleteAction && deleteQuestion}
        </Container>
                ) :
                null
            }
        </Flex>
        </Container>
    );
}