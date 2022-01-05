import React, { useState } from 'react'
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

const validationSchema = Yup.object().shape({

    password: Yup.string()
        .trim()
        .required('Required')
});



const Con2 = () => {



    const history = useHistory()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            password: '',

        }
    });
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        history.push("/LastPage")
    });
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const [radioValue, setRadioValue] = useState('1');
    const [radioValue1, setRadioValue1] = useState('1');


    const radios = [
        { name: 'Present', value: 'Present' },
        { name: 'Absent', value: 'Absent' },

    ];
    return (
        <Container>
            <div className='con mt-5'  ><p className=" text-center" >Attendance Tracker</p></div>
            <Form onSubmit={onSubmit} style={{}} >
                <Table striped bordered hover>
                    <thead>
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
                            <td>Week-1</td>
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

                                    <Form.Control type={passwordVisibility ? "text" : "password"} placeholder="Enter your passcode" {...register("password")} />
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

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Points</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>{con1Data.map((v, i) => (
                    <tr key={i}>
                        <td>{v.date}</td>
                        <td>{v.description}</td>
                        <td>{v.status === "Present" ? <p className="text-success">Present</p> : <p className="text-danger">Absent</p>}


                        </td>

                        <td>{v.point}</td>
                        <td>{v.remarks}</td>
                    </tr>

                ))}


                </tbody>
            </Table>



        </Container>
    )
}

export default Con2
