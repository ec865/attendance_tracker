import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { getToken } from '../utils';


const Contents = () => {
    const [eventData, seteventData] = useState()
    useEffect(() => {

        axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/events`).then((res) => seteventData(res.data))


    }, [])

    const user = getToken()
    console.log(user)
    console.log(eventData)
    return (


        <Container >
            <div className='con mt-5'><p className=" text-center" >Attendance Tracker</p></div>

            <ListGroup className='center mt-5 pd-5'>

                {eventData ? eventData.map((v, i) => (<ListGroup.Item key={i} action href={`Contents/${v.event_id}`} variant="secondary" >{v.event_name}</ListGroup.Item>)) : <p>no data found</p>}

            </ListGroup>


        </Container>


    )
}


export default Contents
