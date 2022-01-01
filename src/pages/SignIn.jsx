import React from 'react'
import { Row, Col } from 'react-bootstrap';
import SignInForm from "../components/SignInForm";

import { Image } from "react-bootstrap";

const SignIn = () => {
    return (
        <div>
            <div className="App">

                <Row className="landing">
                    <Col ><SignInForm /></Col>

                    <Col>
                        <Image src="./img/bg.jpg" thumbnail style={{ border: "none" }} />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default SignIn
