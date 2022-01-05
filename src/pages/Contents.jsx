import React from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const Contents = () => {
    return (


        <Container >
            <div className='con mt-5'><p className=" text-center" >Attendance Tracker</p></div>
            <ListGroup className='center mt-5 pd-5'>

                <ListGroup.Item action href="/Con1" variant="secondary" >Cloud Computing</ListGroup.Item>
                <ListGroup.Item action href="/Con2" variant="success"  >OOP in C++</ListGroup.Item>
                <ListGroup.Item action href="/Con3" variant="dark">Software System Design</ListGroup.Item>
                <ListGroup.Item action href="/Con4" variant="success">Research Methods and Professinal Issues   </ListGroup.Item>


            </ListGroup>


        </Container>


    )
}


export default Contents
