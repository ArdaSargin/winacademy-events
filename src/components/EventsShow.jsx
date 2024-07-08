import styles from '../css/List.module.css';
import { Img, ListItem, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import EventPage from '../pages/EventPage';
import { Link } from 'react-router-dom';

export default function EventsShow({ exactEvent, onEdit }) {
    return <ListItem className={styles.item}>
        <Link to={`/event/${exactEvent.id}`}>
        <Text className={styles.texts}>{exactEvent.title}</Text>
        <Text className={styles.texts}>{exactEvent.description}</Text>
        <Img src={exactEvent.image} alt={exactEvent.title} width={1000} height={200}/>
        <Text className={styles.texts}>{exactEvent.startTime}</Text>
        <Text className={styles.texts}>{exactEvent.endTime}</Text>
        </Link>
    </ListItem>
}