import React from 'react';
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
        history.push("/")
    });
    return (
        <div>
            <br />
            <br />
            <br />
            <Form onSubmit={onSubmit} style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }} >
                <Form.Group >
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && (
                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.email.message}</p>
                    )}
                </Form.Group>
                <Form.Group >
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" {...register("password")} />
                    {errors.password && (
                        <p className="text-red-500 text-sm font-semibold mt-1">{errors.password.message}</p>
                    )}
                </Form.Group>
                <br />
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default SignInForm