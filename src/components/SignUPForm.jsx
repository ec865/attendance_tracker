import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';




// const validationSchema = Yup.object().shape({
//     email: Yup.string().trim().lowercase().required('Required'),
//     password: Yup.string()
//         .trim()
//         .required('Required')
// });

const validationSchema = Yup.object().shape({
    fname: Yup.string()
        .trim()
        .required('Required'),
    lname: Yup.string()
        .trim()
        .required('Required'),
    email: Yup.string().trim().lowercase().required('Required'),
    password: Yup.string()
        .trim()
        .required('Required'),
    reEnterPassword: Yup.string()
        .trim().oneOf([Yup.ref('password')], "Password must've to be same")
        .required('Required')
});

const SignUpForm = () => {
    const history = useHistory()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            fname: '',
            lname: '',
            password: '',
            reEnterPassword: '',
            email: ''
        }
    });
    const onSubmit = handleSubmit(async ({ reEnterPassword, ...data }) => {
        console.log(data);
        history.push("/SignIn")
    });

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [reEnterpasswordVisibility, setReEnterPasswordVisibility] = useState(false)
    return (
        <div>
            <br />
            <br />
            <br />
            <Form onSubmit={onSubmit} >
                <Form.Group className='mt-1' style={{ width: "69.5%", marginLeft: "10%", marginTop: "10%" }}>
                    {/* <Form.Label>First Name</Form.Label> */}
                    <Form.Control type="fname" placeholder="Frist Name" {...register("fname")} />
                    {errors.fname && (
                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.fname.message}</p>
                    )}

                </Form.Group>
                <Form.Group className='mt-1' style={{ width: "69.5%", marginLeft: "10%", marginTop: "10%" }}>
                    {/* <Form.Label>Last Name</Form.Label> */}
                    <Form.Control type="lname" placeholder="Last Name"  {...register("lname")} />
                    {errors.lname && (
                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.lname.message}</p>
                    )}
                </Form.Group>
                <Form.Group className='mt-1' style={{ width: "69.5%", marginLeft: "10%", marginTop: "10%" }}>
                    {/* <Form.Label>Enter your email</Form.Label> */}
                    <Form.Control type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && (
                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.email.message}</p>
                    )}
                </Form.Group>

                <Form.Group className='mt-1 d-flex justify-content-inline' style={{ width: "79%", marginLeft: "10%", marginTop: "10%" }}>


                    {/* <Form.Label>Enter your password</Form.Label> */}

                    <Form.Control type={passwordVisibility ? "text" : "password"} placeholder="Enter your password" {...register("password")} />

                    <button type="button" className="btn btn-secondary pt-2 mt-1 mx-2" onClick={() => setPasswordVisibility(!passwordVisibility)}>{passwordVisibility ? "hide password" : "show"}</button>
                </Form.Group>
                <div className='mr-2 '>{errors.password && (
                    <p className="text-red-500 text-sm font-semibold " style={{ marginLeft: "10%" }}>{errors.password.message}</p>
                )}</div>

                <Form.Group className='mt-1 d-flex justify-content-end' style={{ width: "79%", marginLeft: "10%", marginTop: "10%" }}>
                    {/* <Form.Label>Re-Enter your password</Form.Label> */}
                    <Form.Control type={reEnterpasswordVisibility ? "text" : "password"} placeholder=" Re-Enter your password" {...register("reEnterPassword")} />


                    <button type="button" className="btn btn-secondary pt-2 mt-1 mx-2" onClick={() => setReEnterPasswordVisibility(!reEnterpasswordVisibility)}>{reEnterpasswordVisibility ? "hide password" : "show"}</button>
                </Form.Group>
                {errors.reEnterpasswordVisibility && (
                    <p className="text-red-500 text-sm font-semibold mt-1" style={{ marginLeft: "10%" }}>{errors.reEnterpasswordVisibility.message}</p>
                )}
                <br />
                <Button type="submit" className='mt-1' style={{ width: "20%", marginLeft: "10%", marginTop: "10%", backgroundColor: "#703F3F" }}>Submit</Button>
            </Form>
        </div>

    )
}

export default SignUpForm