import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
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
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Re-Enter your password</Form.Label>
                    <Form.Control type="password" placeholder="Re-Enter your password" />
                </Form.Group>
                <br />
                <Button type="submit">Submit</Button>
            </Form>
        </div>

    )
}

export default SignUpForm