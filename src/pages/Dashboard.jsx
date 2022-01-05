import React, { useState } from 'react'
import { courseName } from '../Data/dasboard_dummyData';
import Modal from 'react-bootstrap/Modal'
import { Button, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'

const Dashboard = () => {
    const [passcode, setpasscode] = useState("")
    const [selectedCourse, setselectedCourse] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const generatePassword = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        setpasscode(result)


    }
    return (
        <Container>







            <button onClick={() => generatePassword()}>Generate Passcode</button>
            {passcode}
            {courseName.map((v, i) => (<div key={i}>{v.name}
                <button onClick={() => { setselectedCourse(v); setShow(true) }}>Delete</button></div>

            ))}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you Sure,you want to delete {selectedCourse.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>








        </Container>

    )
}

export default Dashboard
