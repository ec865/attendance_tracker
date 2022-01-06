import React from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { eventDummyData } from '../Data/event_dumyData'

const Contents = () => {
    return (


        <Container >
            <div className='con mt-5'><p className=" text-center" >Attendance Tracker</p></div>

            <ListGroup className='center mt-5 pd-5'>
                {eventDummyData.map((v, i) => (<ListGroup.Item key={i} action href={`Contents/${v.event_id}`} variant="secondary" >{v.event_name}</ListGroup.Item>))}




            </ListGroup>


        </Container>


    )
}


export default Contents
