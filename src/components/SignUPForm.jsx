import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const SignUpForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [reEnterpasswordVisibility, setReEnterPasswordVisibility] = useState(false)
    return (
        <div>
            <br />
            <br />
            <br />
            <Form style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}>
                <Form.Group >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" placeholder="Frist Name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Last Name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type={passwordVisibility ? "text" : "password"} placeholder="Enter your password" />
                    <button type="button" onClick={() => setPasswordVisibility(!passwordVisibility)}>{passwordVisibility ? "hide password" : "show"}</button>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Re-Enter your password</Form.Label>
                    <Form.Control type={reEnterpasswordVisibility ? "text" : "password"} placeholder=" Re-Enter your password" />
                    <button type="button" onClick={() => setReEnterPasswordVisibility(!reEnterpasswordVisibility)}>{reEnterpasswordVisibility ? "hide password" : "show"}</button>
                </Form.Group>
                <br />
                <Button type="submit">Submit</Button>
            </Form>
        </div>

    )
}

export default SignUpForm