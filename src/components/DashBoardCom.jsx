import React, { useState } from 'react'
import { courseName } from '../Data/dasboard_dummyData';
import Modal from 'react-bootstrap/Modal'
import { Button, Container, Row, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import { DasheventDummyData } from '../Data/dasboard_dummyData'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Col from 'react-bootstrap/Col'
import axios from 'axios';




const validationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required('Required'),

});



const DashBoardCom = () => {
    // const [passcode, setpasscode] = useState("")
    const [selectedCourse, setselectedCourse] = useState("")


    const [show, setShow] = useState(false);
    const [addEvent, setAddEvent] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',

        }
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        setAddEvent(false);
        try {


        }
        catch {





        }

    });



    // const generatePassword = () => {
    //     var result = '';
    //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < 8; i++) {
    //         result += characters.charAt(Math.floor(Math.random() *
    //             charactersLength));
    //     }
    //     setpasscode(result)


    // }
    return (
        <Container className=' text-center pt-5  mb-2 ' >


            {/* <div  >

                {courseName.map((v, i) => (<div key={i}>

                    {v.event_name}
                    <div className=' d-flex justify-content-end'>
                        <Button onClick={() => { setselectedCourse(v); setShow(true) }} style={{ width: "20%", backgroundColor: "#703F3F" }}>Delete</Button></div>


                </div>
                ))}

            </div> */}


            <div className='con mt-5'><p className=" text-center" >Attendance Tracker</p></div>

            <Row>
                <Col><ListGroup className='center mt-5 pd-5  d-flex justify-content-end'>
                    {DasheventDummyData.map((v, i) => (


                        <ListGroup.Item key={i} action href={`DashBoard/${v.dash_event_id}`} variant="secondary" >{v.dash_event_name}






                        </ListGroup.Item>












                    ))}




                </ListGroup></Col>
                <Col>
                    <ListGroup className='center mt-4 pd-5  d-flex justify-content-end'>
                        {DasheventDummyData.map((v, i) => (


                            <ListGroup.Item key={i} variant="secondary" >

                                <Button onClick={() => { setselectedCourse(v); setShow(true) }} style={{ width: "20%", backgroundColor: "#703F3F" }}>Delete</Button>







                            </ListGroup.Item>












                        ))}




                    </ListGroup>


                </Col>


            </Row>



            {/* <ListGroup>

                {DasheventDummyData.map((v, i) => (<div key={i}>


                    <div className=' d-flex justify-content-end'>
                        <Button onClick={() => { setselectedCourse(v); setShow(true) }} style={{ width: "20%", backgroundColor: "#703F3F" }}>Delete</Button></div>


                </div>
                ))}


            </ListGroup> */}
            <br />





            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you Sure,you want to delete {selectedCourse.name}</Modal.Body>

            </Modal>

            <div><Button onClick={() => setAddEvent(true)} style={{ width: "20%", backgroundColor: "#703F3F" }}>
                ADD Event
            </Button>

                <Modal show={addEvent} onHide={() => setAddEvent(false)}>
                    <Form onSubmit={onSubmit} >


                        <Modal.Header closeButton>


                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        {/* <Modal.Body>Are you sure, are going to add a  new Course ?</Modal.Body> */}
                        <Form.Group className='mt-1' style={{ width: "69.5%", marginLeft: "10%", marginTop: "10%" }}>
                            <Form.Control type="text" placeholder="Add Event" {...register("name")} />
                            <Modal.Footer>
                                <Button onClick={() => setAddEvent(false)} style={{ width: "20%", backgroundColor: "#703F3F" }}>
                                    Close
                                </Button>
                                <Button type="submit" style={{ width: "40%", backgroundColor: "#703F3F" }}>
                                    Save Changes
                                </Button>

                            </Modal.Footer>
                        </Form.Group>
                    </Form>

                </Modal>
            </div>

            {/* <div className='mt-5 d-flex justify-content-end pb-2'><Button className=' d-flex justify-content-around' onClick={() => generatePassword()} style={{ width: "30%", backgroundColor: "#703F3F" }} >Generate Passcode</Button>
                <div style={{ width: "30%" }}>{passcode}</div>

            </div>
 */}







        </Container >

    )
}

export default DashBoardCom
