import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { getUserId } from '../utils';

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
    const onSubmit = handleSubmit(async (data) => {

        try {
             await axios.post(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/descriptions/${id.DashBoard_event_id}/add?passcode=${data.passcode}&start_time=${data.start_time}&end_time=${data.end_time}&des_name=${data.des_name}`)
             history.push("/LastPage")
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






        </Container>
    )
}

export default DashBoardCon1