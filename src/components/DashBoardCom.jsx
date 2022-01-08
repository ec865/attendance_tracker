import React, {  useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Container,Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';




const validationSchema = Yup.object().shape({
    event_name: Yup.string()
        .trim()
        .required('Required'),

});



const DashBoardCom = () => {
    // const [passcode, setpasscode] = useState("")
    const [selectedCourse, setselectedCourse] = useState()
    const [renderCount,setrenderCount]= useState(0)
    console.log(selectedCourse)


    const [show, setShow] = useState(false);
    const [addEvent, setAddEvent] = useState(false);

    const handleClose = () => setShow(false);
    const handlEventDelete = async (event_id) => {

        await axios.delete(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/events/delete?event_id=${event_id}`);
        setrenderCount(renderCount + 1)
        console.log(renderCount)
        handleClose()
    }

    const {
        register,
        handleSubmit,
        formState: {},
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
            setrenderCount(renderCount + 1)
            console.log(renderCount)

        }
        catch {





        }

    });

    const [eventData, seteventData] = useState()

    useEffect(() => {

      axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app//api/events`).then((res) => { seteventData(res.data);console.log(res.data)} )


    }, [renderCount])
 

        // axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app//api/events`).then((res) => { seteventData(res.data);console.log(res.data)} )
    





   
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

            








        </Container >

    )
}

export default DashBoardCom
