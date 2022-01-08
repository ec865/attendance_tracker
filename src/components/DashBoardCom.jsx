import React, { useEffect, useState } from 'react'
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
import { removeAccessToken, getToken } from '../utils';




const validationSchema = Yup.object().shape({
    event_name: Yup.string()
        .trim()
        .required('Required'),

});



const DashBoardCom = () => {
    // const [passcode, setpasscode] = useState("")
    const [selectedCourse, setselectedCourse] = useState()
    console.log(selectedCourse)


    const [show, setShow] = useState(false);
    const [addEvent, setAddEvent] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlEventDelete = (event_id) => {
        axios.delete(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/events/delete?event_id=${event_id}`)

        handleClose()
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            event_name: '',

        }
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        setAddEvent(false);
        try {
             await axios.post(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/events/1/add?event_name=${data.event_name}`)
           

        }
        catch {





        }

    });

    const [eventData, seteventData] = useState()
 

        axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app//api/events`).then((res) => { seteventData(res.data);console.log(res.data)} )
    





   
    return (
        <Container className=' text-center pt-5  mb-2 ' >




            <div className='con mt-5'><p className=" text-center" >Attendance Tracker</p></div>

            
                <ListGroup className='center mt-5 pd-5  d-flex justify-content-end'>
                    {eventData?eventData.map((v, i) => (

                        <div key={i} className='center mt-5 pd-5  d-flex justify-content-end' >
                        <ListGroup.Item action href={`DashBoard/${v.event_id}`} variant="secondary" >{v.event_name}
                            


                        </ListGroup.Item>
                         <Button onClick={() => { setselectedCourse(v); setShow(true) }} style={{ width: "20%", backgroundColor: "#703F3F" }}>Delete</Button>
                      

                        </div>


                    ) )   : <p>no data found</p>}




            


            </ListGroup> 
            
            <br />





            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you Sure,you want to delete {selectedCourse&&selectedCourse.event_name}</Modal.Body>

                <div><Button onClick={()=>handlEventDelete(selectedCourse.event_id)} style={{ width: "20%", backgroundColor: "#703F3F" }}>
                Confirm
                </Button>
                </div>

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
                            <Form.Control type="text" placeholder="Add Event" {...register("event_name")} />
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
