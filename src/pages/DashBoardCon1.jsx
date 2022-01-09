import React, { useState,useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';


const validationSchema = Yup.object().shape({

    passcode: Yup.string()
        .trim()
        .required('Required'),
     start_time: Yup.string()
        .trim()
        .required('Required'),
     end_time: Yup.string()
        .trim()
        .required('Required'),
     des_name: Yup.string()
        .trim()
        .required('Required'),
     
});



const DashBoardCon1 = () => {

    const history = useHistory()
    const  id  = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            passcode: '',
            start_time: '',
            end_time: '',
            des_name:'',

        }
    });

    const [attendancesData, setattendancesData] = useState("")
    // const history = useHistory()
    const [descriptionsData, setdescriptionsData] = useState()

    useEffect(() => {

        console.log(38)

        async function fetchdata() {
            await axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/attendances`).then((res) => setattendancesData(res.data))
            await axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/descriptions`).then((res) => setdescriptionsData(res.data))
            
            
        }
        console.log(descriptionsData)
        fetchdata()

        console.log(42)


     
          


    }, [])


    useEffect(() => {
        console.log(descriptionsData)
        if (descriptionsData) {
            console.log(47)
            let events =  descriptionsData.map((e) => {
                e.status = []
                return e
            })
            if ( attendancesData) {
                events = events.map((e) => {
                    
                    console.log(e)
                    attendancesData.map((x) => {
                        console.log(x)
                        if (x.description_id === e.description_id) {
                            e.status.push(x.user_id + ' ')
                        }
                        return x;
                    })
                    return e;

                })


            }
            setattendancesData(events)
           
            
            console.log(events)
        }
    },[descriptionsData] )

    const onSubmit = handleSubmit(async (data) => {

        try {
            
             await axios.post(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/descriptions/${id.DashBoard_event_id}/add?passcode=${data.passcode}&start_time=${data.start_time}&end_time=${data.end_time}&des_name=${data.des_name}`)
             history.push("/sucess")


        }
        catch {
            
        }
        console.log(data);
        
    });
    const [passwordVisibility] = useState(false)
    
    console.log(id)
    
    return (
        <Container>
            <div className='con mt-5'  ><p className=" text-center" >Attendance Tracker</p></div>
            <Form onSubmit={onSubmit} style={{}} >
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Description</th>
                            <th>Passcode</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        <tr>

                            <td>
                                <Form.Group >

                                    <Form.Control type="description" placeholder="Enter your Description" {...register("des_name")} />


                                </Form.Group>




                            </td>


                            <td>


                                <Form.Group >

                                    <Form.Control type={passwordVisibility ? "text" : "password"} placeholder="Enter your passcode" {...register("passcode")} />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.password.message}</p>
                                    )}

                                </Form.Group>

                            </td>



                            <td>


                                <Form.Group >

                                    <Form.Control type="datetime-local" placeholder="Enter Start Time" {...register("start_time")} />


                                </Form.Group>

                            </td>

                            <td>


                                <Form.Group >

                                    <Form.Control type="datetime-local" placeholder="Enter End Time" {...register("end_time")} />


                                </Form.Group>

                            </td>

                           
                        </tr>

                    </tbody>
                </Table>
                
              


                
                <br />
                <div className="col-md-12 text-center " >
                    <Button type="submit" variant="danger">Submit</Button>
                </div>
            </Form>
            <br/>


            <Table striped bordered hover className=" text-center">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Users</th>
                        {/* <th>Remarks</th> */}
                    </tr>
                </thead>
                <tbody>{descriptionsData && descriptionsData.map((v, i) => (
                    <tr key={i}>
                        <td>{v.start_time}--{v.end_time} </td>
                        <td>{v.description_name}</td>
                        <td>{v.status}</td>
                        {/* <td>{v.remarks}</td> */}
                    </tr>

                ))}

                </tbody>
                
            </Table>






        </Container>
    )
}

export default DashBoardCon1