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

    // Edit content
    
    const editFunction = (e) => {
        e.preventDefault();
        const updatedTitle = title || events.title;
        const updatedDescription = description || events.description;
        const updatedStartTime = startTime || events.startTime;
        const updatedEndTime= endTime || events.endTime;
        const updatedImage = image || events.image;
        editEvent(params.id, updatedTitle, updatedDescription, updatedImage, updatedStartTime, updatedEndTime);
        back('/');
        toast({
                title: "Everthing is uploaded successfuly!",
                position: "top",
                status: "success",
                isClosable: true
            });
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

    const saveEdit = <Button className={styles.icons} onClick={editFunction}>Save <EditIcon boxSize={5} color="green.100" /></Button>;
    const saveDelete = <Button className={styles.icons} onClick={deleteFunction}>Delete <DeleteIcon  boxSize={5} color="red.100" /></Button>;

    // Showing the form

    function showForm() {
        setEditForm(!editForm);
        toast({
            title: "Click on the text to update content!",
            position: "top",
            status: "info",
            isClosable: true
        });
    }

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
                    {editForm ? <Input className={styles.input} type='text' defaultValue={title || events.title} onChange={(event) => setTitle(event.target.value)} /> : <Text>{events.title}</Text>}
                    {editForm && <Button className={styles.back} onClick={() => window.location.reload()}>Back</Button>}
                  </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='text' defaultValue={description || events.description} onChange={(event) => setDescription(event.target.value)} /> : <Text>{events.description}</Text>}
                 {editForm && <Button className={styles.back} onClick={() => window.location.reload()}>Back</Button>}
                </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='date' defaultValue={startTime || events.startTime} onChange={(event) => setStartTime(event.target.value)} /> : <Text>{events.startTime}</Text>}
                 {editForm && <Button className={styles.back} onClick={() => window.location.reload()}>Back</Button>}
                </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='date' defaultValue={endTime || events.endTime} onChange={(event) => setEndTime(event.target.value)} /> : <Text>{events.endTime}</Text>}
                 {editForm && <Button className={styles.back} onClick={() => window.location.reload()}>Back</Button>}
                </Box>
             </GridItem>

             <GridItem className={styles.grid}>
                <Box className={styles.list}>
                 {editForm ? <Input className={styles.input} type='text' onChange={(event) => setImage(event.target.value)} placeholder='copy/paste a url in here' /> : <Text>Edit image</Text>}
                 {editForm && <Button className={styles.back} onClick={() => window.location.reload()}>Back</Button>}
                </Box>
             </GridItem>
            </Grid>

            {/* The footer */}
            <Box className={styles.footer} as='footer'> 
                {editForm ? <Button className={styles.icons} onClick={editFunction}>Save <EditIcon boxSize={5} color="green.100" /></Button> : <Button className={styles.icons} onClick={showForm}>Edit <EditIcon boxSize={5} color="green.100" /></Button>}
                <Button className={styles.icons} onClick={deleteFunction}>Delete <DeleteIcon  boxSize={5} color="red.100" /></Button>
            </Box>

            {/* The delete message */}
            {deleteAction && deleteQuestion}
        </Container>
                ) :
                null
            }
        </Flex>
        </Container>
    );
}