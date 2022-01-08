import React, { useState,useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/Button'

import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { con1Data } from '../Data/con1_dummyData'
import axios from 'axios';
import { getUserId, getAttendances } from '../utils';



const validationSchema = Yup.object().shape({

    passcode: Yup.string()
        .trim()
        .required('Required')
});



const Con1 = () => {
    // const user = getAttendances()
    //  console.log(user)

    const [attendancesData, setattendancesData] = useState("")
    const history = useHistory()

    


    const [descriptionsData, setdescriptionsData] = useState()
    const userId = getUserId()
   
   
    useEffect(() => {

        console.log(38)

        async function fetchdata() {
               await axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/attendances`).then((res) => setdescriptionsData(res.data))
            
        }
        fetchdata()
   
        console.log(42)


     
          


    }, [])
   
    useEffect(() => {
          console.log(descriptionsData)
        
        if (descriptionsData) {
        
           let events = descriptionsData.filter((e) => e.user_id = userId)
            setattendancesData(events)
           
            
            console.log(47)
        }


    },[descriptionsData]

    )

    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            passcode: '',
            status:'',

        }
    });
    
    
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        history.push("/LastPage")

         try {
            await axios.post(`https://attendance-backend-3my2gtpqya-ew.a.run.app/api/descriptions/event2/add?passcode=${data.passcode}&start_time=${data.start_time}&end_time=${data.end_time}&des_name=${data.des_name}`)
            history.push("/LastPage")
        }
        catch {

           
        }
    });
    const [passwordVisibility] = useState(false)
    const [radioValue, setRadioValue] = useState('1');
    // const [radioValue1, setRadioValue1] = useState('1');


    const radios = [
        { name: 'Present', value: 'Present' },
        { name: 'Absent', value: 'Absent' },

    ];
    return (
        <Container>
            <div className='con mt-5 text-center"'  ><p className=" text-center" >Attendance Tracker</p></div>
            <Form onSubmit={onSubmit} style={{}} className=" text-center">
                <Table striped bordered hover  className=" text-center">
                    <thead className=" text-center">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Passcode</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>01/12/2022</td>
                            <td>{ attendancesData.length>0&&attendancesData[0].description_id }</td>
                            <td>

                                <ButtonGroup className="mb-2  " variant='outline-primary'>
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant='outline-success'
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </td>

                            <td>


                                <Form.Group >

                                    <Form.Control type={passwordVisibility ? "text" : "password"} placeholder="Enter your passcode" {...register("passcode")} />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.password.message}</p>
                                    )}

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

            <br />
            <br />

            <Table striped bordered hover className=" text-center">
                <thead>
                    <tr>
                        {/* <th>Date</th> */}
                        <th>Description</th>
                        <th>Status</th>
                        {/* <th>Remarks</th> */}
                    </tr>
                </thead>
                <tbody>{attendancesData && attendancesData.map((v, i) => (
                    <tr key={i}>
                        {/* <td>{v.date}</td> */}
                        <td>{v.description_id}</td>
                        <td>{v.status === "present" ? <p className="text-success">Present</p> : <p className="text-danger">Absent</p>}
                        </td>
                        {/* <td>{v.remarks}</td> */}
                    </tr>

                ))}

                </tbody>
                
            </Table>



        </Container>
    )
}

export default Con1
