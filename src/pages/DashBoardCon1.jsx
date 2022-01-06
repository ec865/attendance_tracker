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
import { dashBoardCon1Data } from '../Data/dashBoard_con1_dummyData'

const validationSchema = Yup.object().shape({

    password: Yup.string()
        .trim()
        .required('Required')
});



const DashBoardCon1 = () => {



    const history = useHistory()

    const {
        register,
        handleSubmit,
        formState: { errors },
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
    const [passwordVisibility] = useState(false)
    const [description] = useState(false)


    const [radioValue, setRadioValue] = useState('1');
    // const [radioValue1, setRadioValue1] = useState('1');


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

                            <th>Description</th>

                            <th>Passcode</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>

                            <td>
                                <Form.Group >

                                    <Form.Control type="description" placeholder="Enter your Description" {...register("description")} />


                                </Form.Group>




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






        </Container>
    )
}

export default DashBoardCon1