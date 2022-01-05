import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';


// interface IData {
//     email: string;
//     password: string;


// }
const validationSchema = Yup.object().shape({
    email: Yup.string().trim().lowercase().required('Required'),
    password: Yup.string()
        .trim()
        .required('Required')
});


const SignInForm = () => {
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
            email: '',
        }
    });
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        if (data.email === "admin@city.edu") {
            history.push("/dashboard")
        }
        else {
            history.push("/Contents")
        }
    });
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    return (
        <div>
            <br />
            <br />
            <br />
            <Form onSubmit={onSubmit} style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }} >
                <Form.Group className='d-flex justify-content-end '>
                    {/* <Form.Label>Enter your email</Form.Label> */}
                    <Form.Control type="email" placeholder="Enter your email" {...register("email")} />

                </Form.Group>
                <div>
                    {errors.email && (
                        <p className="text-red-500 text-sm font-semibold mt-1" style={{ marginLeft: ".5%" }}>{errors.email.message}</p>
                    )}
                </div>
                <Form.Group className='d-flex justify-content-end mt-1' >
                    {/* <Form.Label>Enter your password</Form.Label> */}
                    <Form.Control type={passwordVisibility ? "text" : "password"} placeholder="Enter your password" {...register("password")} />

                    <button type="button" className="btn btn-secondary pt-2 mt-1 mx-1" onClick={() => setPasswordVisibility(!passwordVisibility)}>{passwordVisibility ? "hide password" : "show"}</button>
                </Form.Group>
                <div>{errors.password && (
                    <p className="text-red-500 text-sm font-semibold mt-1" style={{ marginLeft: ".5%" }}>{errors.password.message}</p>
                )}</div>
                <br />
                <Button type="submit" style={{ width: "20%", backgroundColor: "#703F3F" }}>Submit</Button>
            </Form>
        </div>
    )
}

export default SignInForm