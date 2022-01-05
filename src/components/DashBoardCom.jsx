import React, { useState } from 'react'
import { courseName } from '../Data/dasboard_dummyData';
import Modal from 'react-bootstrap/Modal'
import { Button, Container } from 'react-bootstrap';


const Dashboard = () => {
    const [passcode, setpasscode] = useState("")
    const [selectedCourse, setselectedCourse] = useState("")


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



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
        <Container className=' text-center pt-5  mb-2 ' >


            <div className='pt-5 mt-5' >

                {courseName.map((v, i) => (<div key={i}>{v.name}
                    <div className=' d-flex justify-content-end'>
                        <Button onClick={() => { setselectedCourse(v); setShow(true) }} style={{ width: "20%", backgroundColor: "#703F3F" }}>Delete</Button></div>


                </div>
                ))}


            </div>





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

            <div className='pt-5'><Button onClick={handleShow} style={{ width: "20%", backgroundColor: "#703F3F" }}>
                ADD Course
            </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>Are you sure, are going to add a  new Course ?</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose} style={{ width: "20%", backgroundColor: "#703F3F" }}>
                            Close
                        </Button>
                        <Button onClick={handleClose} style={{ width: "40%", backgroundColor: "#703F3F" }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className='mt-5 d-flex justify-content-end pb-2'><Button className=' d-flex justify-content-around' onClick={() => generatePassword()} style={{ width: "30%", backgroundColor: "#703F3F" }} >Generate Passcode</Button>
                <div style={{ width: "30%" }}>{passcode}</div>

            </div>








        </Container>

    )
}

export default Dashboard
